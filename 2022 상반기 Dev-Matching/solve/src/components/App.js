import SelectedLanguages from "./SelectedLanguages.js";
import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";

import { fetcheLanguages } from "../lib/utils/api.js";

import { MAX_DISPLAY_NUMBER } from "../lib/constants.js";

export default class App {
  constructor(target) {
    this.state = {
      fetchedLanguages: [],
      selectedLanguages: [],
      keyword: "",
    };

    this.selectedLanguages = new SelectedLanguages({
      target,
      initialState: [],
    });

    this.searchInput = new SearchInput({
      target,
      initialState: "",
      onChange: async (keyword) => {
        if (keyword.length === 0) {
          this.setState({
            fetchedLanguages: [],
          });

          return;
        }

        const languages = await fetcheLanguages(keyword);
        this.setState({
          fetchedLanguages: languages,
          keyword,
        });
      },
    });

    this.suggestion = new Suggestion({
      target,
      initialState: {
        selectedIndex: 0,
        items: [],
      },
      onSelect: (language) => {
        alert(language);

        const newSelectedLanguages = [...this.state.selectedLanguages];

        const index = newSelectedLanguages.indexOf(language);

        if (index > -1) {
          newSelectedLanguages.splice(index, 1);
        }
        newSelectedLanguages.push(language);

        if (newSelectedLanguages.length > MAX_DISPLAY_NUMBER) {
          newSelectedLanguages.splice(0, 1);
        }

        this.setState({
          ...this.state,
          selectedLanguages: newSelectedLanguages,
        });
      },
    });
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.suggestion.setState({
      items: this.state.fetchedLanguages,
      selectedIndex: 0,
      keyword: this.state.keyword,
    });
    this.selectedLanguages.setState(this.state.selectedLanguages);
  }
}
