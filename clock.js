const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".time"),
    dayTitle = clockContainer.querySelector(".day");


function getTime(){
    const date = new Date();
    const years = date.getFullYear();
    const months = date.getMonth() + 1;
    const days = date.getDate();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    dayTitle.innerText = `${years}.${months}.${days}`;
}

function init(){
    getTime();
    setInterval(getTime, 100);
}
init();