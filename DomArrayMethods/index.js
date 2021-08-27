const API_URL = "https://randomuser.me/api";

const main = document.getElementById("main");
const addBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilliBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate-wealth");

const fetcher = (url) => fetch(url).then((res) => res.json());

const initMain = () => {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
};

const initWealth = () => {
  const entireWealth = document.getElementById("wealth");
  if (entireWealth) {
    main.removeChild(entireWealth);
  }
};

const getRandomUser = async () => {
  const data = await fetcher(API_URL);
  const { first, last } = data.results[0].name;
  const wealth = Math.floor(Math.random() * 1000000);
  return [first, last, wealth];
};

const addUser = async () => {
  initWealth();
  const [first, last, wealth] = await getRandomUser();
  const person = document.createElement("div");
  person.setAttribute("class", "person");
  person.innerHTML = `<strong>${first} ${last}</strong>${wealth}`;
  main.appendChild(person);
};

const doubleMoney = () => {
  initWealth();
  const people = document.querySelectorAll(".person");
  [...people].forEach((person) => {
    const newMoney = person.innerHTML.split("</strong>")[1] * 2;
    const name = person.innerHTML.split("</strong>")[0].split("<strong>")[1];
    person.innerHTML = `<strong>${name}</strong>${newMoney}`;
  });
};

const showMillionaires = () => {
  const people = document.querySelectorAll(".person");
  initMain();
  [...people]
    .filter((person) => person.innerHTML.split("</strong>")[1] >= 1000000)
    .forEach((millionaires) => main.appendChild(millionaires));
};

const sortByRichest = () => {
  const people = document.querySelectorAll(".person");
  initMain();
  const sortedPeople = [...people].sort(
    (a, b) =>
      b.innerHTML.split("</strong>")[1] - a.innerHTML.split("</strong>")[1]
  );
  sortedPeople.forEach((sortedPerson) => main.appendChild(sortedPerson));
};

const calculateTotalWealth = () => {
  //   let total = 0;
  const people = document.querySelectorAll(".person");
  const peopleArray = Array.from(people);
  //   peopleArray.forEach(
  //     (person) => (total += +person.innerHTML.split("</strong>")[1])
  //   );
  const total = peopleArray
    .map((person) => +person.innerHTML.split("</strong>")[1])
    .reduce((a, b) => a + b);
  const entireWealth = document.createElement("div");
  entireWealth.setAttribute("id", "wealth");
  entireWealth.innerHTML = `<h3>Total Wealth <strong>$${total}</strong></h3>`;
  main.appendChild(entireWealth);
};

function init() {
  for (let i = 0; i < 3; i++) addUser();
  addBtn.addEventListener("click", addUser);
  doubleBtn.addEventListener("click", doubleMoney);
  showMilliBtn.addEventListener("click", showMillionaires);
  sortBtn.addEventListener("click", sortByRichest);
  calculateBtn.addEventListener("click", calculateTotalWealth);
}

init();
