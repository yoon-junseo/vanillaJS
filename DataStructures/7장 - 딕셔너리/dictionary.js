function Dictionary() {
  this.datastore = new Array();
  this.add = add;
  this.remove = remove;
  this.find = find;
  this.showAll = showAll;
  this.count = count;
  this.clear = clear;
}

function add(key, value) {
  this.datastore[key] = value;
}

function find(key) {
  return this.datastore[key];
}

function remove(key) {
  delete this.datastore[key];
}

function showAll() {
  for (let key of Object.keys(this.datastore).sort()) {
    console.log(key + " -> " + this.datastore[key]);
  }
}

function count() {
  let n = 0;

  for (let _ of Object.keys(this.datastore)) {
    ++n;
  }

  return n;
}

function clear() {
  for (let key of Object.keys(this.datastore)) {
    delete this.datastore[key];
  }
}

const pbook = new Dictionary();
pbook.add("Mike", "123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
console.log("Number of entries: ", pbook.count());
console.log("David`s extension: " + pbook.find("David"));
pbook.remove("David");
pbook.showAll();
pbook.clear();
console.log("Number of entries: ", pbook.count());
