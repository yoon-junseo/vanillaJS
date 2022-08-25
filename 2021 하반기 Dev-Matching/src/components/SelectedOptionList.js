import { $ } from "../lib/utils/dom.js";

export default class SelectedOptionList {
  constructor({ $target, productPrice, selectedOptionList }) {
    this.$target = $target;
    this.state = {
      productPrice,
      selectedOptionList,
      totalPrice: 0,
    };

    this.$elem = document.createElement("div");
    this.$elem.className = "ProductDetail__selectedOptions";

    this.render();
    this.setEvent();
  }

  render() {
    const { productPrice, selectedOptionList = [], totalPrice } = this.state;

    this.$target.innerHTML = "";
    console.log(selectedOptionList);

    this.$target.insertAdjacentHTML(
      "beforeend",
      `
                <h3>선택된 상품</h3>
                <ul>
                    ${selectedOptionList
                      .map(
                        (option) => `
                        <li data-option-id="${option.id}" >
                            ${option.name} ${productPrice + option.price}원
                            <div>
                                <input type="number" value="${
                                  option.count
                                }">개</div>
                            </div>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
                <div class="ProductDetail__totalPrice">${totalPrice}</div>
                <button class="OrderButton">주문하기</button>
        `
    );
  }

  setEvent() {
    $("input").addEventListener("change", (e) => {
      const $li = e.target.closest("li");
      const { optionId } = $li.dataset;

      const selectedOptionIdx = this.state.selectedOptionList.findIndex(
        (option) => option.id === +optionId
      );

      const newSelectedOptionList = [...this.state.selectedOptionList];
      newSelectedOptionList.splice(selectedOptionIdx, 1, {
        ...this.state.selectedOptionList[selectedOptionIdx],
        count: e.target.value,
      });

      const totalPrice = newSelectedOptionList.reduce((prev, curr) => {
        if (!prev) return (this.state.productPrice + curr.price) * +curr.count;

        return prev + (this.state.productPrice + curr.price * +curr.count);
      }, 0);

      console.log("totalPrice: ", totalPrice);

      this.setState({
        selectedOptionList: newSelectedOptionList,
      });
    });
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }
}
