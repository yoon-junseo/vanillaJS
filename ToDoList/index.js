let todo = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#toDoList");

function addList(e) {
  e.preventDefault();
  let key = 0;
  let newList = document.createElement("li");
  let newText = document.createTextNode(todo.value);
  let delBtn = document.createElement("span");
  let delText = document.createTextNode("X");

  newList.appendChild(newText);
  delBtn.appendChild(delText);
  delBtn.setAttribute("id", "delBtn");

  newList.appendChild(delBtn);

  // key 추가
  key++;
  newList.setAttribute("key", key);

  list.appendChild(newList);

  todo.value = "";
  deleteList();
}

function deleteList() {
  let delList = document.querySelectorAll("#delBtn");
  delList.forEach((list) => {
    list.addEventListener("click", () => {
      if (list.parentNode.parentNode) {
        list.parentNode.parentNode.removeChild(list.parentNode);
      }
    });
  });
}

addBtn.addEventListener("click", addList);
