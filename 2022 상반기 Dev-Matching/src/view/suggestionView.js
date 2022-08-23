import { $ } from "../lib/utils/dom.js";

class SuggestionView {
  #target = null;

  constructor(target) {
    this.#target = target;
  }

  render(isInit) {
    this.#target.insertAdjacentHTML(
      "beforeend",
      `
                <div class="Suggestion"></div>
            `
    );

    if (isInit) {
      $(".Suggestion").style.display = "none";
    }
  }

  changeLanguages({ languages, selectedIndex }) {
    const $suggestion = $(".Suggestion");

    if (languages.length <= 0) {
      $(".Suggestion").style.display = "none";
      return;
    }

    $suggestion.style.display = "block";

    $suggestion.innerHTML = `
            <ul>
                ${languages
                  .map(
                    (lanuage, index) =>
                      `<li class="${
                        index === selectedIndex && "Suggestion__item--selected"
                      }" >${lanuage}</li>`
                  )
                  .join("")}
            </ul>
        `;
  }
}

export default SuggestionView;
