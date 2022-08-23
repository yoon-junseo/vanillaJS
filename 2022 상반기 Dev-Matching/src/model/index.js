class Model {
  #searchResults = [];
  #selectedLanguages = [];
  #selectedIndex = 0;

  get searchResults() {
    return this.#searchResults;
  }

  get selectedLanguages() {
    return this.#selectedLanguages;
  }

  get selectedIndex() {
    return this.#selectedIndex;
  }

  set searchResults(search) {
    this.#searchResults = search;
  }

  set selectedLanguages(selectedLanguages) {
    this.#selectedLanguages = selectedLanguages;
  }

  set selectedIndex(selectedIndex) {
    this.#selectedIndex = selectedIndex;
  }
}

export default Model;
