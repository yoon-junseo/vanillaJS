import { $ } from "../lib/utils/dom.js";
import { fetchLanguages } from "../lib/utils/api.js";
import selectLanguage from "../lib/utils/selectLanguage.js";
import debounce from "../lib/utils/debounce.js";

import { actionIgnoreKeys, actionRequireKeys } from "../lib/constants/index.js";

class Controller {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
    this.init();
    this.setEvent();
  }

  init() {
    this.view.selectedLanguagesView.render();
    this.view.searchInputView.render();
    this.view.suggestionView.render(true);
    $(".SearchInput__input").focus();
  }

  setEvent() {
    this.onChangeSearch($(".SearchInput__input"));
    this.onSubmit($(".SearchInput"));
    this.onClickLanguage($(".Suggestion"));
    this.onChangeSelectedIndex(window);
  }

  addEvent(selector, eventType, callback) {
    selector.addEventListener(eventType, (e) => callback(e));
  }

  onChangeSearch(selector) {
    this.addEvent(
      selector,
      "keyup",
      debounce(async (e) => {
        const { value: keyword } = e.target;

        if (actionIgnoreKeys.includes(e.key)) return;

        if (!keyword) {
          this.model.searchResults = [];
          this.model.selectedIndex = 0;

          this.view.suggestionView.changeLanguages({
            languages: this.model.searchResults,
            selectedIndex: this.model.selectedIndex,
          });
          return;
        }

        const res = await fetchLanguages(keyword);
        this.model.searchResults = res;
        this.model.selectedIndex = 0;
        this.view.suggestionView.changeLanguages({
          languages: this.model.searchResults,
          selectedIndex: this.model.selectedIndex,
        });
      })
    );
  }

  onChangeSelectedIndex(selector) {
    this.addEvent(selector, "keyup", (e) => {
      const { searchResults, selectedIndex } = this.model;

      if (e.key === "Enter") {
        if (searchResults.length === 0) return;

        alert(searchResults[selectedIndex]);

        const tempSelectedLanguages = this.model.selectedLanguages;

        selectLanguage(
          tempSelectedLanguages,
          this.model.selectedLanguages,
          searchResults[selectedIndex],
          this.view.selectedLanguagesView.changeSelectedLanguage
        );
      }

      if (!actionRequireKeys.includes(e.key)) return;

      if (searchResults.length === 0) return;

      if (e.key === "ArrowDown") {
        if (searchResults.length === selectedIndex + 1) {
          this.model.selectedIndex = 0;
        } else {
          this.model.selectedIndex += 1;
        }
      }

      if (e.key === "ArrowUp") {
        if (selectedIndex === 0) {
          this.model.selectedIndex = searchResults.length - 1;
        } else {
          this.model.selectedIndex -= 1;
        }
      }

      this.view.suggestionView.changeLanguages({
        languages: searchResults,
        selectedIndex: this.model.selectedIndex,
      });
    });
  }

  onClickLanguage(selector) {
    this.addEvent(selector, "click", (e) => {
      const { innerText: language } = e.target;

      alert(language);

      const tempSelectedLanguages = this.model.selectedLanguages;

      selectLanguage(
        tempSelectedLanguages,
        this.model.selectedLanguages,
        language,
        this.view.selectedLanguagesView.changeSelectedLanguage
      );
    });
  }

  onSubmit(selector) {
    this.addEvent(selector, "submit", (e) => {
      e.preventDefault();
    });
  }
}

export default Controller;
