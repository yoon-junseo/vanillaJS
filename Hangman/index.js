const wordList = document.getElementById("word");
const wrongWordList = document.getElementById("wrong-letters");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-button");
const notification = document.getElementById("notification-container");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["apple", "banana", "cat", "dog", "example"];

let selectedWord;
let letters;

let correctLetters = [];
let wrongLetters = [];
let answer = [];

// 랜덤 단어 생성 함수
const getRandomWord = () => {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  letters = selectedWord.split("");
};

// 정답 단어 빈칸을 보여주는 함수
const displayWords = () => {
  letters.map(() => {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    wordList.appendChild(SPAN);
  });
};

// 키 이벤트를 처리하는 함수
const onKeyPressHandler = (e) => {
  const { key } = e;
  const duplicated = checkDuplicatedKey(key);
  if (key < "a" || key > "z") return;
  if (!duplicated) {
    if (selectedWord.includes(e.key)) {
      showCorrectLetter(key);
    } else {
      showWrongLetter(key);
    }
  }
};

// 정답인 단어를 보여주는 함수
const showCorrectLetter = (key) => {
  correctLetters.push(key);
  letters.map((letter, idx) => {
    if (letter === key) {
      answer.push(0);
      isGameEnded();
      const TEXT = document.createTextNode(letter);
      wordList.childNodes[idx].appendChild(TEXT);
    }
  });
};

// 틀린 단어를 보여주는 함수
const showWrongLetter = (key) => {
  wrongLetters.push(key);
  isGameEnded();

  // 처음인 경우에만 Wrong 생성
  if (wrongLetters.length === 1) {
    const P = document.createElement("p");
    const TEXT = document.createTextNode("Wrong");
    P.appendChild(TEXT);
    wrongWordList.appendChild(P);
  }

  // 틀린 단어 화면에 표시
  const SPAN = document.createElement("span");
  const TEXT = document.createTextNode(
    wrongLetters.length === 1
      ? wrongLetters[wrongLetters.length - 1]
      : "," + wrongLetters[wrongLetters.length - 1]
  );
  SPAN.appendChild(TEXT);
  wrongWordList.appendChild(SPAN);

  // 행맨 그림 표시
  figureParts[wrongLetters.length - 1].style = "display: block";
};

// 단어 중복 체크
const checkDuplicatedKey = (key) => {
  if (wrongLetters.includes(key) || correctLetters.includes(key)) {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
    return true;
  }
};

// 게임이 종료 되었는지 확인하는 함수
const isGameEnded = () => {
  if (wrongLetters.length === 6) {
    const TEXT = document.createTextNode("You lose the game!");
    finalMessage.appendChild(TEXT);
    popup.style = "display: flex";
  } else if (answer.length === letters.length) {
    const TEXT = document.createTextNode("You win the game!");
    finalMessage.appendChild(TEXT);
    popup.style = "display: flex";
  }
};

const resetGame = () => {
  popup.style = "display: none";
  wrongWordList.innerHTML = "";
  wordList.innerHTML = "";
  correctLetters = [];
  answer = [];
  letters = [];
  wrongLetters = [];
  figureParts.forEach((part) => (part.style = "display: none"));
  finalMessage.innerText = "";

  getRandomWord();
  displayWords();
};

const init = () => {
  getRandomWord();
  displayWords();
  document.addEventListener("keydown", (e) => onKeyPressHandler(e));
  playAgainBtn.addEventListener("click", resetGame);
};

init();
