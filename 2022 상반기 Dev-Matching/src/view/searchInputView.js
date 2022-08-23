class SearchInputView {
  #target = null;

  constructor(target) {
    this.#target = target;
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
}

export default SearchInputView;
