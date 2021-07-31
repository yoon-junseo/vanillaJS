const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const amountInputOne = document.querySelector("#amount-one");
const amountInputTwo = document.querySelector("#amount-two");
const swapBtn = document.querySelector(".btn");
const currencyResult = document.querySelector(".rate");

function calculateRate() {
  const currency1 = currencyOne.value;
  const currency2 = currencyTwo.value;
  let rate1 = 0;
  let rate2 = 0;
  const amount1 = amountInputOne.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
    .then((res) => res.json())
    .then((data) => {
      rate1 = data.rates[currency1];
      rate2 = data.rates[currency2];
      const rate = data.rates[currency2] / data.rates[currency1];
      currencyResult.innerText = `1 ${currency1} = ${rate.toFixed(
        2
      )} ${currency2}`;
      amountInputTwo.value = amount1 * rate;
    });
}

function onClickSwap() {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculateRate();
}

function init() {
  currencyOne.addEventListener("change", calculateRate);
  amountInputOne.addEventListener("input", calculateRate);
  currencyTwo.addEventListener("change", calculateRate);
  amountInputTwo.addEventListener("input", calculateRate);
  swapBtn.addEventListener("click", onClickSwap);
  calculateRate();
}

init();
