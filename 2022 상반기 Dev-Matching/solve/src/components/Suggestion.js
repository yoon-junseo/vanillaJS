export default class Suggestion {
  #target = null;

  constructor({ target, initialState, onSelect }) {
    this.#target = target;
    this.state = initialState;
    this.onSelect = onSelect;

    this.$suggestion = document.createElement("div");
    this.$suggestion.className = "Suggestion";
    target.appendChild(this.$suggestion);

    this.render();
    this.setEvent();
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  render() {
    const { items = [], selectedIndex, keyword } = this.state;

    if (items.length > 0) {
      this.$suggestion.style.display = "block";
      this.$suggestion.innerHTML = `
            <ul>
                ${items
                  .map(
                    (item, index) => `
                    <li class="${
                      index === selectedIndex && "Suggestion__item--selected"
                    }" data-index="${index}">${this.renderMatchedItem(
                      keyword,
                      item
                    )}</li>
                `
                  )
                  .join("")}
            </ul>
        `;
      return;
    }

    this.$suggestion.style.display = "none";
    this.$suggestion.innerHTML = "";
  }

  setEvent() {
    window.addEventListener("keyup", (e) => {
      if (this.state.items.length === 0) return;

      if (e.key === "Enter") {
        this.onSelect(this.state.items[this.state.selectedIndex]);
        return;
      }

      const navigationKeys = ["ArrowUp", "ArrowDown"];

      if (!navigationKeys.includes(e.key)) return;

      const { selectedIndex } = this.state;
      const lastIndex = this.state.items.length - 1;

      let nextIndex = selectedIndex;

      if (e.key === "ArrowUp") {
        nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1;
      }
      if (e.key === "ArrowDown") {
        nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
      }

      this.setState({
        ...this.state,
        selectedIndex: nextIndex,
      });
    });

    this.$suggestion.addEventListener("click", (e) => {
      const $li = e.target.closest("li");

      if (!$li) return;

      const { index } = $li.dataset;
      this.onSelect(this.state.items[+index]);
    });
  }

  renderMatchedItem(keyword, item) {
    if (!item.toLowerCase().includes(keyword.toLowerCase())) return item;

    const matchedText = item.match(new RegExp(keyword, "gi"))[0];

    return item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  }
}
