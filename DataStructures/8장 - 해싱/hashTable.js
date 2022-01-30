function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.put = put;
  this.get = get;
  this.buildChains = buildChains;
}

function get(key) {
  let idx = 0;
  const pos = this.betterHash(key);

  if (this.table[pos][idx] === key) {
    return this.table[pos][idx + 1];
  }

  idx += 2;

  while (this.table[pos][idx] !== key) {
    idx += 2;
  }
  return this.table[pos][idx + 1];
}

function put(key, data) {
  const pos = this.betterHash(key);
  let idx = 0;

  if (this.table[pos][idx] === undefined) {
    this.table[pos][idx] = data;
    return;
  }

  idx++;
  while (this.table[pos][idx] !== undefined) {
    idx++;
  }
  this.table[pos][idx] = data;
}

function simpleHash(data) {
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    total += data.charCodeAt(i);
  }

  return total % this.table.length;
}

function betterHash(string) {
  const H = 37;
  let total = 0;

  for (let i = 0; i < string.length; i++) {
    total += H * total + string.charCodeAt(i);
  }

  total = total % this.table.length;

  if (total < 0) {
    total += this.table.length - 1;
  }
  return parseInt(total, 10);
}

function showDistro() {
  for (let i = 0; i < this.table.length; i++) {
    if (this.table[i][0] !== undefined) {
      console.log(`${i}: ${this.table[i]}`);
    }
  }
}

function buildChains() {
  for (let i = 0; i < this.table.length; i++) {
    this.table[i] = new Array();
  }
}

const dataList = [
  "David",
  "Jennifer",
  "Donnie",
  "Raymond",
  "Cynthia",
  "Mike",
  "Clayton",
  "Danny",
  "Jonathan",
];

const hTable = new HashTable();
hTable.buildChains();
dataList.forEach((data) => hTable.put(hTable.get(data), data));

hTable.showDistro();
