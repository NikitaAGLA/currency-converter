//Создаю функцию для добавления активных кнопок
function addActive (elem) {
elem.style.backgroundColor = '#833AE0';
elem.style.color = '#ffffff';
elem.style.cursor = 'default';
}

//Удаление стиля активной кнопки
function removeActive (elem) {

}
//Функция для получения текущего курса валюты
//Расчет текущего курса валют
function curs (base, symbols, num) {
    fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    .then((response) => response.json())
    .then(result => {
        //Расчет текущего курса валют
        rightInp.value = Number(result.rates[symbols])*Number(num);
    })
}

//Обработка вводимых данных и запрос текущего курса валют
function enterCurrency (event, numCurrency=1) {
    numCurrency = Number(typeof event.srcElement != 'undefined'?event.srcElement.value:numCurrency);
    curs(leftCurs, rightCurs, numCurrency);
}
//Получает название левой секции, удаляет стили и назначает для новой кнопки
function changeCurs (event) {
    leftInp.value=1;
    leftCurs = event.target.name;
    leftBtn.forEach((elem) => {
        elem.removeAttribute('style');    
    });
    addActive(event.target);
    enterCurrency(leftInp);
}
//Начальные параметры 
let leftCurs = 'RUB';
let rightCurs = 'USD';


let leftBtn = document.querySelectorAll('.leftSection button');
console.log(leftBtn);
let leftInp = document.querySelector('.inputValue input');
console.log(leftInp);
let rightBtn = document.querySelectorAll('.rightSection button');
console.log(rightBtn);
let rightInp = document.querySelector('.outValue input');
console.log(rightInp);

// Стартовый код для запуска страницы и первон парам
addActive(leftBtn[0]);
addActive(rightBtn[1]);
curs (leftCurs, rightCurs, 1);

//Событие ввода левой секции
leftInp.oninput = (event) => {
    enterCurrency(event);
};

//Событие нажатия на кнопку лувой секции
leftBtn.forEach((e)=>{
    e.onclick = (event) => {
        changeCurs(event);
    };
});
