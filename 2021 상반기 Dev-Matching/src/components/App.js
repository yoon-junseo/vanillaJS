import { fetchNodes } from "../lib/utils/api.js";
import { $ } from "../lib/utils/dom.js";
import { ESC_KEY_LIST } from "../lib/constants.js";

import BreadCrumb from "./BreadCrumb.js";
import Nodes from "./Nodes.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";

export default class App {
  $imageView = null;

  constructor($target) {
    this.state = {
      isRoot: true,
      fetchedNodes: [],
      breadCrumbs: ["root"],
    };

    this.$target = $target;

    this.init();

    this.$breadCrumb = new BreadCrumb({
      $target,
      initialState: {
        breadCrumbs: this.state.breadCrumbs,
      },
    });

    this.$nodes = new Nodes({
      $target,
      initialState: {
        isRoot: this.state.isRoot,
        fetchedNodes: this.state.fetchedNodes,
      },
      onClick: async (e) => {
        const $elem = e.target.closest(".Node");

        const {
          dataset: { nodeId },
        } = $elem;

        const newBreadCrumbs = [...this.state.breadCrumbs];

        const isPrevious = nodeId === "previous";
        let previousNodeId = null;

        const selectedNodeIndex = this.state.fetchedNodes.findIndex(
          (node) => node.id === nodeId
        );
        const selectedNode = this.state.fetchedNodes[selectedNodeIndex];

        if (!isPrevious && selectedNode.type === "FILE") {
          this.$imageView = new ImageView({
            $target: this.$target,
            initialState: { filePath: selectedNode.filePath },
            onClick: (e) => {
              const {
                target: { className },
              } = e;

              if (!className.includes("ImageViewer")) return;

              this.$target.removeChild($(".ImageViewer"));
            },
          });

          return;
        }

        if (isPrevious) {
          newBreadCrumbs.pop();
          const previousBreadScrumb = newBreadCrumbs[newBreadCrumbs.length - 1];
          const previousNodeIndex = this.state.fetchedNodes.findIndex(
            (node) => node.name === previousBreadScrumb
          );
          previousNodeId = this.state.fetchedNodes[previousNodeIndex];
        }

        if (!isPrevious) {
          newBreadCrumbs.push(selectedNode.name);
        }

        const res = await fetchNodes(isPrevious ? previousNodeId : nodeId);

        this.setState({
          isRoot: false,
          breadCrumbs: newBreadCrumbs,
          fetchedNodes: res,
        });
      },
    });
  }

  init() {
    (async () => {
      const res = await fetchNodes();
      this.state = {
        ...this.state,
        fetchedNodes: res,
      };
      this.$nodes.setState({
        fetchedNodes: this.state.fetchedNodes,
      });
    })();

    window.addEventListener("keyup", (e) => {
      const { key } = e;

      if (!ESC_KEY_LIST.includes(key)) return;

      const $imageView = $(".ImageViewer");

      if (!$imageView) return;

      this.$target.removeChild($imageViewg);
    });
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.$breadCrumb.setState({
      breadCrumbs: this.state.breadCrumbs,
    });
    this.$nodes.setState({
      isRoot: this.state.isRoot,
      fetchedNodes: this.state.fetchedNodes,
    });
  }
}
