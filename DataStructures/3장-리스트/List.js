function List() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = []; // 리스트 요소를 저장할 빈 배열 초기화
  this.clear = clear;
  this.find = find;
  this.toString = toString;
  this.insert = insert;
  this.append = append;
  this.remove = remove;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.length = length;
  this.moveTo = moveTo;
  this.getElement = getElement;
  this.contains = contains;
  this.currPos = currPos;
}

function append(element) {
  this.dataStore[this.listSize++] = element;
}

function find(element) {
  for (let i = 0; i < this.dataStore.length; i++) {
    if (this.dataStore[i] === element) {
      return i;
    }
  }
  return -1;
}

function remove(element) {
  let findIdx = this.find(element);
  if (findIdx > -1) {
    this.dataStore.splice(findIdx, 1);
    --this.listSize;
    return true;
  }
  return false;
}

function getLength() {
  return this.listSize;
}

function toString() {
  return this.dataStore;
}

function insert(element, after) {
  let insertPos = this.find(after);
  if (insertPos > -1) {
    this.dataStore.splice(insertPos + 1, 0, element);
    ++this.listSize;
    return true;
  }
  return false;
}

function clear() {
  this.dataStore = [];
  this.listSize = 0;
  this.pos = 0;
}

function contains(element) {
  for (let i = 0; i < this.dataStore.length; i++) {
    if (this.dataStore[i] === element) {
      return true;
    }
  }
  return false;
}

function length() {
  return this.listSize;
}

function front() {
  this.pos = 0;
}

function end() {
  this.pos = this.listSize - 1;
}

function prev() {
  if (this.pos > 0) {
    --this.pos;
  }
}

function next() {
  if (this.pos < this.listSize - 1) {
    ++this.pos;
  }
}

function currPos() {
  return this.pos;
}

function moveTo(position) {
  this.pos = position;
}

function getElement() {
  return this.dataStore[this.pos];
}

let names = new List();
names.append("1");
names.append("2");
names.append("3");
names.append("4");
names.append("5");
names.append("6");

for (names.front(); names.currPos() < names.length(); names.next()) {
  print(names.getElement());
}

// for (names.front(); names.currPos() < names.length(); names.next()) {
//   //   console.log(names.getElement());
//   console.log(names.currPos(), names.length());
// }

// for (names.end(); names.currPos >= 0; names.prev()) {
//   console.log(names.getElement(), names.currPos());
// }
// console.log(names.getElement(), names.currPos());
