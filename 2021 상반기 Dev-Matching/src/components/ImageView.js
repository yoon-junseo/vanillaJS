import { $ } from "../lib/utils/dom.js";

import { IMAGE_PATH } from "../lib/constants.js";

export default class ImageView {
  constructor({ $target, initialState, onClick }) {
    this.$target = $target;
    this.state = initialState;
    this.onClick = onClick;

    this.render();
    this.setEvent();
  }

  render() {
    const { filePath } = this.state;

    this.$target.insertAdjacentHTML(
      "beforeend",
      `
      <div class="Modal ImageViewer">
        <div class="Content">
          <img src="${IMAGE_PATH(filePath)}">
        </div>
      </div>
    `
    );
  }

  setEvent() {
    const $imageView = $(".ImageViewer");

    $imageView.addEventListener("click", (e) => this.onClick(e));
  }
}
