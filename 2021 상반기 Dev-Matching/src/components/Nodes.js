import { $$ } from "../lib/utils/dom.js";

export default class Nodes {
  constructor({ $target, initialState, onClick }) {
    this.$target = $target;
    this.state = initialState;
    this.onClick = onClick;

    this.$nodes = document.createElement("div");
    this.$nodes.className = "Nodes";
    this.$target.appendChild(this.$nodes);

    this.render();
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  render() {
    const { isRoot, fetchedNodes = [] } = this.state;

    const template = `
            ${fetchedNodes
              .map((node) => {
                const iconPath =
                  node.type === "DIRECTORY"
                    ? "assets/directory.png"
                    : "assets/file.png";

                return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src=${iconPath}>
                        <div>${node.name}</div>
                    </div>`;
              })
              .join("")}
        `;
    const $previous = `
            <div class="Node" data-node-id="previous">
                <img src="assets/prev.png" >
            </div>
        `;

    this.$nodes.innerHTML = isRoot ? template : $previous + template;
    this.setEvent();
  }

  setEvent() {
    $$(".Node").forEach(($node) => {
      $node.addEventListener("click", (e) => {
        this.onClick(e);
      });
    });
  }
}
