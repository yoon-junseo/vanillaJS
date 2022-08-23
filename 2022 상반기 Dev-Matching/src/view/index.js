import SelectedLanguagesView from "./selectedLanguagesView.js";
import SearchInputView from "./searchInputView.js";
import SuggestionView from "./suggestionView.js";

class View {
  selectedLanguagesView = null;
  searchInputView = null;
  suggestionView = null;

  constructor(target) {
    this.selectedLanguagesView = new SelectedLanguagesView(target);
    this.searchInputView = new SearchInputView(target);
    this.suggestionView = new SuggestionView(target);
  }
}

export default View;
