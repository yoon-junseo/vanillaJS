export default class SelectedLanguages {
  constructor({ target, initialState }) {
    this.state = initialState;

    this.$selectedLanguages = document.createElement("div");
    this.$selectedLanguages.className = "SelectedLanguage";
    target.appendChild(this.$selectedLanguages);

    this.render();
  }

  render() {
    this.$selectedLanguages.innerHTML = `
        <ul>
            ${this.state
              .map(
                (item) => `
                <li>${item}</li>
            `
              )
              .join("")}
        </ul>
    `;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
}
