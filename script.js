//Функция для нижнего отображения

function cursTitle (one=1, two=1) {
    console.dir(cursRightInfo);

    cursLeftInfo.innerHTML = `1 ${leftCurs} = ${Number(two).toFixed(4)} ${rightCurs}`;
    cursRightInfo.innerHTML = `1 ${rightCurs} = ${Number(1/two).toFixed(4)} ${leftCurs}`;
}

//Создаю функцию для добавления активных кнопок
function addActive (elem) {
    elem.style.backgroundColor = '#833AE0';
    elem.style.color = '#ffffff';
    elem.style.cursor = 'default';
    }
    
    //Функция для получения текущего курса валюты
    //Расчет текущего курса валют
    function curs (base, symbols, num, elemCalc, elemOne) {
        if (base == symbols) {
            elemCalc.value = num;
            elemOne.value = num;
            return;
        }
        fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
        .then((response) => response.json())
        .then(result => {
            //Расчет текущего курса валют
            elemCalc.value = (Number(result.rates[symbols])*Number(num)).toFixed(4);
            elemOne.value = num;
            cursTitle (num, result.rates[symbols]);
        })
    }
    
    //Обработка вводимых данных и запрос текущего курса валют
    function enterCurrency (event, first, second, sideElem, sideOne, numCurrency=1) {
        numCurrency = Number(typeof event.srcElement != 'undefined'?event.srcElement.value:numCurrency);
        
        curs(first, second, numCurrency, sideElem, sideOne);
    }
    //Получает название левой секции, удаляет стили и назначает для новой кнопки
    function changeCurs (event, side) {
        let $input, $curs, $cursConvert, $btn, $sideOne;
        if (side == 'left') {
            $input = rightInp;
            $sideOne = leftInp;
            $curs = leftCurs;
            $cursConvert = rightCurs;
            $btn = leftBtn;
        } else if (side == 'right'){
            $input = leftInp;
            $curs = rightCurs;
            $sideOne = rightInp;
            $cursConvert = leftCurs;
            $btn = rightBtn;
        }

        $btn.forEach((elem) => {
            elem.removeAttribute('style');    
        });
        console.dir(event.target);
        addActive(event.target);
        enterCurrency($input, $curs, $cursConvert, $input, $sideOne);
    }
    //Начальные параметры 
    let leftCurs = 'RUB';
    let rightCurs = 'RUB';

    
    let leftBtn = document.querySelectorAll('.leftSection button');
    let leftInp = document.querySelector('.inputValue input');
    let rightBtn = document.querySelectorAll('.rightSection button');
    let rightInp = document.querySelector('.outValue input');
    let cursLeftInfo = document.querySelector('.cursLeftInfo');
    let cursRightInfo = document.querySelector('.cursRightInfo');
    
    // Стартовый код для запуска страницы и первон парам
    addActive(leftBtn[0]);
    addActive(rightBtn[0]);
    
    //Событие ввода левой секции
    leftInp.oninput = (event) => {
        enterCurrency(event, leftCurs, rightCurs, rightInp, leftInp);
    };

    rightInp.oninput = (event) => {
        enterCurrency(event, rightCurs, leftCurs, leftInp, rightInp);
    };


    
    //Событие нажатия на кнопку лувой секции
    leftBtn.forEach((e)=>{
        e.onclick = (event) => {
            leftCurs = event.target.name;
            changeCurs(event, 'left');
        };
    });
    
    
    rightBtn.forEach((e)=>{
        e.onclick = (event) => {
            rightCurs = event.target.name;
            changeCurs(event, 'right');
        };
    });