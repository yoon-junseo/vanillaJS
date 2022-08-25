import { $ } from "../lib/utils/dom.js";

export default class ProductListPage {
  constructor({ $app, productList, onClickProduct }) {
    this.$app = $app;
    this.state = {
      productList,
    };
    this.onClickProduct = onClickProduct;

    this.$page = document.createElement("div");
    this.$page.className = "ProductListPage";
    this.$page.innerHTML = "<h1>상품목록</h1>";

    this.$app.appendChild(this.$page);

    this.render();
    this.setEvent();
  }

  render() {
    const { productList = [] } = this.state;
    console.log(productList);

    this.$page.insertAdjacentHTML(
      "beforeend",
      `
            <ul>
                ${productList
                  .map(
                    (product) =>
                      `<li class="Product" data-product-id="${product.id}">
                        <img src="${product.imageUrl}" >
                        <div class="Product__info">
                            <div>${product.name}</div>
                            <div>${product.price}~</div>
                        </div>
                    </li>`
                  )
                  .join("")}
            </ul>
        `
    );
  }

  setEvent() {
    $("ul").addEventListener("click", this.onClickProduct.bind(this));
  }
}
