const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-todoList"),
  finishList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
const FINISH_LS = "finished";
let toDos = [];
let finished = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (toDoList.contains(li)) toDoList.removeChild(li);
  else finishList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    console.log(toDo.id);
    return toDo.id !== parseInt(li.id);
  });
  const cleanFinished = finished.filter(function(finish) {
    console.log(finish.id);
    return finish.id !== parseInt(li.id);
  });

  toDos = cleanToDos;
  finished = cleanFinished;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(FINISH_LS, JSON.stringify(finished));
}

function checkToDos(event) {
  const btn = event.target;
  btn.innerText = "✔";
  btn.addEventListener("click", checkFinish);
  const li = btn.parentNode;
  finishList.appendChild(li);
  const text = li.querySelector("span");
  const newId = parseInt(li.id);
  console.log(li);
  const finishedObj = {
    text: text.innerText,
    id: newId
  };
  console.log(finishedObj);
  finished.push(finishedObj);
  const cleanToDos = toDos.filter(function(toDo) {
    console.log(toDo.id);
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDos;

  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  checkBtn.innerText = "✅";
  checkBtn.addEventListener("click", checkToDos);
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;
  li.classList.add("lists");
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);

  console.log(li);
  console.log(toDoObj);
  saveToDos();
}

function checkFinish(event) {
  const btn = event.target;
  btn.innerText = "✅";
  btn.addEventListener("click", checkToDos);
  const li = btn.parentNode;
  toDoList.appendChild(li);
  const text = li.querySelector("span");
  const newId = parseInt(li.id);
  //console.log(li);
  const toDoObj = {
    text: text.innerHTML,
    id: newId
  };
  toDos.push(toDoObj);

  const cleanFinished = finished.filter(function(finish) {
    //console.log(finish.id);
    return finish.id !== parseInt(li.id);
  });

  finished = cleanFinished;

  saveToDos();
}

function paintFinish(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  checkBtn.innerText = "✔";
  checkBtn.addEventListener("click", checkFinish);
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;

  li.classList.add("lists");
  finishList.appendChild(li);

  const finishedObj = {
    text: text,
    id: newId
  };
  finished.push(finishedObj);

  //console.log(li);
  //console.log(finishedObj);
  saveToDos();
}

function handleSubmit2(event) {
  event.preventDefault();
  // event.stopPropagation();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  toDoForm.addEventListener("submit", handleSubmit2);
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedFinished = localStorage.getItem(FINISH_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function(toDo) {
      paintFinish(toDo.text);
    });
  }
}

function init() {
  loadToDos();
}
init();
