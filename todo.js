const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoBox");

const TODOS_LS = "ToDos";

let toDos = [];
let clickStacks = 0;

function deleteToDo(event){
    clickStacks = clickStacks + 1;
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    borderTopDelete();
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.className = "toDoText"
    span.innerText = text;
    const newId = toDos.length + clickStacks + 1;
    li.appendChild(span);
    li.appendChild(delBtn);
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

function handleSubmit(event){
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
            paintToDo(toDo.text)
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
    toDoForm.addEventListener("submit", handleSubmit);
    borderTopDelete();
}

init();