import { getProductList, getProductInfo } from "../lib/utils/api.js";

import { init, routeChange } from "../router.js";

import ProductListPage from "./ProductListPage.js";
import ProductDetailPage from "./ProductDetailPage.js";

export default class App {
  constructor($app) {
    this.$app = $app;

    init(this.route.bind(this));

    this.route();
  }

  route() {
    const { pathname } = location;

    const routePathname = pathname.replace("web/", "");

    this.$app.innerHTML = "";

    if (routePathname === "/") {
      let productList = [];

      (async () => {
        productList = await getProductList();

        new ProductListPage({
          $app: this.$app,
          productList,
          onClickProduct: (e) => {
            const $li = e.target.closest("li");

            if (!$li) return;

            const { productId } = $li.dataset;

            routeChange(`/products/${productId}`);
          },
        });
      })();
    } else if (routePathname.indexOf("/products/") === 0) {
      const [, , productId] = routePathname.split("/");

      let product = {};

      (async () => {
        product = await getProductInfo(productId);

        new ProductDetailPage({
          $app: this.$app,
          product,
        });
      })();
    }
  }
}
