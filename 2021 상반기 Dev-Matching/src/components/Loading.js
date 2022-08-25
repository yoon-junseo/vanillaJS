export default class Loading {
  constructor({ $target, onClick }) {
    this.$target = $target;
    this.onClick = onClick;

    this.render();
  }

  render() {
    this.$target.insertAdjacentHTML(
      "beforeend",
      `
        <div class="Modal Loading">
            <div class="content">
                <img src="assets/nyan-cat.gif" />
            </div>
        </div>
        `
    );
  }

  setEvent() {}
}
