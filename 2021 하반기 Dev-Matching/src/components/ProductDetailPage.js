import { $ } from "../lib/utils/dom.js";

import SelectedOptionList from "./SelectedOptionList.js";

export default class ProductDetailPage {
  constructor({ $app, product }) {
    this.$app = $app;
    this.state = {
      product,
      selectedOptionList: [],
    };

    this.$page = document.createElement("div");
    this.$page.className = "ProductDetailPage";

    this.$app.appendChild(this.$page);

    this.render();
    this.setEvent();
  }

  render() {
    const { product = {} } = this.state;

    this.$page.innerHTML = `
            <h1>${product.name} 상품 정보</h1>
            <div class="ProductDetail">
                <img src="${product.imageUrl}" >
                <div class="ProductDetail__info">
                    <h2>${product.name}</h2>
                    <div class="ProductDetail__price">${product.price}원~</div>
                    <select>
                        <option>선택하세요.</option>
                        ${product.productOptions
                          .map(
                            (option) => `
                            <option value="${option.id}" ${
                              product.stock === 0 ? "disabled" : ""
                            }>
                                ${product.stock === 0 ? `(품절) ` : ``}${
                              product.name
                            } ${option.name} ${
                              option.stock !== 0 && option.price > 0
                                ? `(+${option.price})`
                                : ``
                            }
                            </option>
                        `
                          )
                          .join("")}
                    </select>
                    <div class="ProductDetail__selectedOptions">
                        <h3>선택된 상품</h3>
                    </div>
                </div>
            </div>
        `;
  }

  setEvent() {
    this.$page.addEventListener("change", (e) => {
      if (e.target.tagName !== "SELECT") return;

      const selectedOptionId = +e.target.value;

      const idx = this.state.selectedOptionList.findIndex(
        (option) => option.id === selectedOptionId
      );

      if (idx !== -1) return;

      const selectedOptionIdx = this.state.product.productOptions.findIndex(
        (option) => option.id === selectedOptionId
      );
      const selectedOption =
        this.state.product.productOptions[selectedOptionIdx];

      const newSelectedOptionList = [...this.state.selectedOptionList];

      newSelectedOptionList.push({
        ...selectedOption,
        count: 1,
      });

      this.setState({ selectedOptionList: newSelectedOptionList });

      new SelectedOptionList({
        $target: $(".ProductDetail__selectedOptions"),
        productPrice: this.state.product.price,
        selectedOptionList: this.state.selectedOptionList,
      });
    });
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
  }
}
