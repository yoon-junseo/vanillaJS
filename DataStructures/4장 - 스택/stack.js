function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length = length;
  this.clear = clear;
}

function push(element) {
  this.dataStore[this.top++] = element;
}

function pop() {
  if (top <= 0) return null;
  return this.dataStore[--this.top];
}

function peek() {
  return this.dataStore[this.top - 1];
}

function length() {
  return this.top;
}

function clear() {
  this.top = 0;
}

// 진법 변환
function mulBase(num, base) {
  let s = new Stack();

  while (num > 0) {
    s.push(num % base);
    num = Math.floor((num /= base));
  }

  let converted = "";

  while (s.length() > 0) {
    converted += s.pop();
  }

  return converted;
}

let num = 32;
let base = 2;
let convertedNum = mulBase(num, base);
console.log(num + " converted to base " + base + " is " + convertedNum);

num = 125;
base = 8;
convertedNum = mulBase(num, base);
console.log(num + " converted to base " + base + " is " + convertedNum);

// 회문 검사
function isPalindrome(word) {
  let s = new Stack();

  for (let i = 0; i < word.length; i++) {
    s.push(word[i]);
  }

  let reversedWord = "";

  while (s.length() > 0) {
    reversedWord += s.pop();
  }

  if (word === reversedWord) {
    return true;
  } else {
    return false;
  }
}

let word = "hello";

if (isPalindrome(word)) {
  console.log(`${word} is a palindrome.`);
} else {
  console.log(`${word} is not a palindrome`);
}

word = "racecar";

if (isPalindrome(word)) {
  console.log(`${word} is a palindrome.`);
} else {
  console.log(`${word} is not a palindrome`);
}

// 재귀
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function fact(n) {
  let s = new Stack();

  while (n > 1) {
    s.push(n--);
  }

  let product = 1;

  while (s.length() > 0) {
    product *= s.pop();
  }
  return product;
}

console.log(`factorial: ${factorial(5)}`);
console.log(`fact: ${fact(5)}`);
