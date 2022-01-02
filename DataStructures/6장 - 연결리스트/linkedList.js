function Node(element) {
  this.element = element;
  this.next = null;
  this.previous = null;
}

function LinkedList() {
  this.head = new Node("head");
  this.head.next = this.head;
  this.currNode = this.head;
  this.find = find;
  this.insert = insert;
  this.findPrevious = findPrevious;
  this.remove = remove;
  this.findLast = findLast;
  this.advance = advance;
  this.dispReverse = dispReverse;
  this.display = display;
}

function find(item) {
  let currNode = this.head;

  while (currNode.element !== item) {
    currNode = currNode.next;
  }

  return currNode;
}

function insert(newElement, item) {
  let newNode = new Node(newElement);
  let current = this.find(item);

  newNode.next = current.next;
  newNode.previous = current;
  current.next = newNode;
  this.currNode = newNode;
}

function findPrevious(item) {
  let currNode = this.head;

  while (currNode.next !== null && currNode.next.element !== item) {
    currNode = currNode.next;
  }

  return currNode;
}

function remove(item) {
  let currNode = this.find(item);

  if (currNode.next !== null) {
    currNode.previous.next = currNode.next;
    currNode.next.previous = currNode.previous;
    this.currNode = currNode.next.previous;

    currNode.next = null;
    currNode.previous = null;
  }
}

function advance(n) {
  for (let i = 0; i < n; i++) {
    if (this.currNode.next !== null) {
      this.currNode = this.currNode.next;
    }
  }

  return this.currNode;
}

function findLast() {
  let currNode = this.head;

  while (currNode.next !== null) {
    currNode = currNode.next;
  }

  return currNode;
}

function dispReverse() {
  let currNode = this.head;
  currNode = this.findLast();

  while (currNode.previous !== null && currNode.next.element !== "head") {
    currNode = currNode.previous;
  }
}

function display() {
  let currNode = this.head;

  while (currNode.next !== null && currNode.next.element !== "head") {
    console.log(currNode.next.element);
    currNode = currNode.next;
  }
}

// /**
//  * 예제 코드
//  */
let cities = new LinkedList();
cities.insert("1", "head");
cities.insert("2", "1");
cities.insert("3", "2");
cities.insert("4", "3");
cities.display();
console.log("---------------");

cities.remove("4");
cities.display();
console.log("---------------");

console.log(cities.advance(0));
