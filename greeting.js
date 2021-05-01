const greetingForm = document.querySelector(".js-form"),
    toDo = document.querySelector(".js-toDoBox"),
    input = greetingForm.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    greetingBox = document.querySelector(".js-greetingsBox");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";
    FADEOUT_CN = "fadeOut";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    greetingForm.classList.add(SHOWING_CN);
    greetingForm.addEventListener("submit", handleSubmit);
}

function fixName(event){
    greeting.classList.remove("showing");
    greetingForm.classList.add("showing");
}

function paintGreeting(text){
    greetingForm.classList.remove(SHOWING_CN);
    toDo.classList.add("showingGrid")
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    const fixBtn = document.createElement("button");
    fixBtn.className = "fixBtn";
    fixBtn.innerText = "🛠";
    greetingBox.appendChild(fixBtn);
    fixBtn.addEventListener("click", fixName);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}

function paintFixBtn(){
    const fixBtn = document.querySelector(".fixBtn");
    fixBtn.classList.remove(FADEOUT_CN);
    fixBtn.classList.add(SHOWING_CN);
}

function deleteFixBtn(){
    const fixBtn = document.querySelector(".fixBtn");
    fixBtn.classList.remove(SHOWING_CN);
    fixBtn.classList.add(FADEOUT_CN);
}

function init(){
    loadName();
    greetingBox.addEventListener("mouseover", paintFixBtn);
    greetingBox.addEventListener("mouseout", deleteFixBtn);
}

init();