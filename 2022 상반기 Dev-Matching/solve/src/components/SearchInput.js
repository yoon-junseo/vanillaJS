import { $ } from "../lib/utils/dom.js";

export default class SearchInput {
  #target = null;

  constructor({ target, initialState, onChange }) {
    this.#target = target;
    this.state = initialState;
    this.onChange = onChange;
    this.render();

    this.$form = $("form");

    $(".SearchInput__input").focus();

    this.setEvent();
  }

  render() {
    this.#target.insertAdjacentHTML(
      "beforeend",
      `
        <form class="SearchInput">
            <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요.">
        </form>
    `
    );
  }

  setEvent() {
    this.$form.addEventListener("keyup", (e) => {
      const actionIgnoreKeys = [
        "Enter",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ];

      if (actionIgnoreKeys.includes(e.key)) return;

      this.onChange(e.target.value);
    });
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
