const selectBox = document.getElementById("movie");
const selectBoxOptions = document.getElementById("movie").options;
const rows = document.querySelectorAll(".row");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

let ticketPrice = 0;
let seatCount = 0;
let totalPrice = 0;

function initDraw() {
  const seatsIndex = JSON.parse(localStorage.getItem("seatsIndex"));
  const movieIndex = localStorage.getItem("movieIndex");
  const moviePrice = localStorage.getItem("moviePrice");
  // 선택된 좌석 표시
  if (seatsIndex !== null && seatsIndex.length > 0) {
    seatCount += seatsIndex.length;
    seats.forEach((seat, idx) => {
      if (seatsIndex.indexOf(idx) > -1) {
        seat.setAttribute("class", "seat selected");
      }
    });
  }
  // 셀렉박스 영화 설정, 가격 설정
  selectBoxOptions["selectedIndex"] = movieIndex;
  ticketPrice = moviePrice;

  // 가격 표시
  updateMovieInfo(seatsIndex.length, moviePrice);
}

function updateMovieInfo(seatCount, ticketPrice) {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  totalPrice = seatCount * ticketPrice;
  count.innerText = seatCount;
  total.innerText = totalPrice;
  localStorage.setItem("seatsIndex", JSON.stringify(seatsIndex));
}

function onChangeSelect(e) {
  ticketPrice = e.target.value;
  if (seatCount) {
    updateMovieInfo(seatCount, ticketPrice);
  }
  localStorage.setItem("moviePrice", ticketPrice);
  localStorage.setItem("movieIndex", selectBoxOptions["selectedIndex"]);
}

function onClickRow(e) {
  const seat = e.target;
  const seatCurrentStatus = seat.getAttribute("class");
  switch (seatCurrentStatus) {
    case "seat":
      seat.setAttribute("class", "seat selected");
      seatCount += 1;
      updateMovieInfo(seatCount, ticketPrice);
      break;
    case "seat selected":
      seat.setAttribute("class", "seat");
      seatCount -= 1;
      updateMovieInfo(seatCount, ticketPrice);
      break;
  }
}

function init() {
  initDraw();
  selectBox.addEventListener("change", onChangeSelect);

  rows.forEach((row) => {
    row.addEventListener("click", onClickRow);
  });
}

init();
