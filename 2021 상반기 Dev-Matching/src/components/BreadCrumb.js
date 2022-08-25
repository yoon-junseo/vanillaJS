import { $ } from "../lib/utils/dom.js";

export default class BreadCrumb {
  constructor({ $target, initialState, onClick }) {
    this.$target = $target;
    this.state = initialState;
    this.onClick = onClick;

    this.$breadCrumb = document.createElement("nav");
    this.$breadCrumb.className = "BreadCrumb";

    this.$target.appendChild(this.$breadCrumb);

    this.render();
  }

  render() {
    const { breadCrumbs = [] } = this.state;

    this.$breadCrumb.innerHTML = `
            ${breadCrumbs
              .map((breadCrumb) => `<div>${breadCrumb}</div>`)
              .join("")}
        `;
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }
}
