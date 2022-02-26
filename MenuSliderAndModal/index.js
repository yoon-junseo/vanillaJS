const $ = (selector) => document.querySelector(selector);

const toggle = $("#toggle");
const modalOpenBtn = $("#open");
const modalCloseBtn = $("#close");
const modal = $(".modal-container");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  console.log(document.body);
});

modalOpenBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener(
  "click",
  (e) => e.target === modal && modal.classList.remove("show-modal")
);
