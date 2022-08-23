import { $ } from "../lib/utils/dom.js";

class SelectedLanguagesView {
  #target = null;

  constructor(target) {
    this.#target = target;
  }

  render() {
    this.#target.insertAdjacentHTML(
      "beforeend",
      `
                 <div class="SelectedLanguage"></div>
            `
    );
  }

  changeSelectedLanguage(selectedLanguages) {
    const $selectedLanguage = $(".SelectedLanguage");

    $selectedLanguage.innerHTML = `
            <ul>
                ${selectedLanguages
                  .map((language) => `<li>${language}</li>`)
                  .join("")}
            </ul>
        `;
  }
}

export default SelectedLanguagesView;
