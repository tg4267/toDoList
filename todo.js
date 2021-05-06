const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoBox");

const TODOS_LS = "ToDos";

let toDos = [];
let clickStacks = 0;

function deleteToDo(event){
    clickStacks = clickStacks + 1;
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    borderTopDelete();
    saveToDos();
}

function checkToDo(event){
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    const text = li.querySelector(".toDoText");
    console.log(toDos);
    if (event.target.className === "checkBtn") {
        text.classList.add("checkToDo");
        btn.className = "checkedBtn";
        toDos.forEach(function(toDo){
            if(toDo.id === parseInt(li.id)){
                toDo.status = "fin"
            }
        })
        saveToDos();
    } else {
        text.className = "toDoText";
        btn.className = "checkBtn";
        toDos.forEach(function(toDo){
            if(toDo.id === parseInt(li.id)){
                delete toDo.status;
            }
        })
        saveToDos();
    }
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "buttonBox";
    const delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const checkBtn = document.createElement("button");
    checkBtn.className = "checkBtn";
    checkBtn.innerText = "✔"
    checkBtn.addEventListener("click", checkToDo);
    const span = document.createElement("span");
    span.className = "toDoText"
    span.innerText = text;
    const newId = toDos.length + clickStacks + 1;
    div.appendChild(checkBtn);
    div.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(div);
    li.id = newId;
    li.className = "np";
    toDoList.appendChild(li);
    toDoList.appendChild(toDoForm);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintFinToDo(text){
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "buttonBox";
    const delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const checkBtn = document.createElement("button");
    checkBtn.className = "checkedBtn";
    checkBtn.innerText = "✔"
    checkBtn.addEventListener("click", checkToDo);
    const span = document.createElement("span");
    span.className = "toDoText checkToDo"
    span.innerText = text;
    const newId = toDos.length + clickStacks + 1;
    div.appendChild(checkBtn);
    div.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(div);
    li.id = newId;
    li.className = "np";
    toDoList.appendChild(li);
    toDoList.appendChild(toDoForm);
    const toDoObj = {
        text: text,
        id: newId,
        status: "fin"
    };
    toDos.push(toDoObj);
    saveToDos();
}

function toDoHandleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    borderTopDelete();
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            if(toDo.status === "fin"){
                paintFinToDo(toDo.text);
            } else {
                paintToDo(toDo.text);
            }
        });
    }
}

function borderTopDelete(){
    const listNum = toDoList.childElementCount;
    const topNum = Math.floor(listNum / 7);
    for (let i = 0; i < listNum; i++){
        toDoList.children[i].className = "np";
    }

    for (let i = 0; i <= topNum; i++){
        toDoList.children[i*7].classList.add("delTop");
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", toDoHandleSubmit);
    borderTopDelete();
}

init();