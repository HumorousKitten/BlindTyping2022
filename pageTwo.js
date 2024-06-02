//------------------ПЕРЕМЕННЫЕ------------------

//уровни
let levels = {
    1: 'фф ыы вв аа оо лл дд фы ва ол дж ыф ыоол ылыо вафы ллаж лажл олдф лолло',
    2: 'пп рр ррпп рпрр ррпр ппрр прпп рпрр рпрр прпр фрпп рфаы рожа пдпв жопаф',
    3: 'кк гг кг гк гкгк ккгг ккгк гкгк выыд дкыг кака кокк ажгв ггдп гкко лыкг',
    4: 'уу шш уш ушуу шшуу фжуш двшу роук пшшп укрд ыауп уопш шгож ршпф шувш кр',
    5: 'мм .. ьь .ь м .ь м ь.мм ьм.. м..ь мь.м ..ьм фь.в к.м пфм ь.шь а.а.м ..м',
    6: 'ии тт ,, ,т и ,т иф афти аи,и миир т,аь матф ,ити ттри фььи м,ри фират,',
    7: 'сс бб бс ссбб бсбб бьу ссбс сбуг буги сгбр у,би сру сг,с ьбс, с,.. уббс',
    8: 'ее нн ен не енне нене еншш пежк ентр н,ин пбне еньп де.е тнаь ьефь ене.',
    9: 'тт рр ит тб ирдь ттрд ,дррт ..ии ,,.. и.и, тр., рт ,,., тир д,.ь ьр. бб',
    10: 'йй зз йз зйзз зййз гзнс авйт азгй зтйш атжй заар азйз тнйа йзый з мзаз,',
    11: 'чч юю чю юч чююч юччю чжчю ююкч чюл. бчю. ю,ч. чиюю кк.ч ббью, ьт. йуюч',
    12: 'цц щщ цщ щцщ щццщ чйсщ цэщщ юццй шсй цщвщ жцтщ эсющ йэ.ч ссщ. э,йц щцйц',
    13: 'хх ъъ хъ ххъх ъхъъ ъхъх ъъхъ ххъх ,тэт ъхых ъбйх хъюх гътъ хънъ .ъхс ъб',
    14: 'ёё --  ё-  ё- - ё _- ё -- ёё ё-ё ёё- ъ-лё -тж т-у ёёъч зёё ч ё-__ лч ё_',
    15: '11 22 33 44 55 12 131у е114 ле16 ел23 4541 2у3е 3325 е33л 1555 32ул 33л',
    16: '66 77 88 99 00 6790 0976 9ф0к 0000 97пп 89ф9 9876 фп9к пк00 кф76 09кп ф',
    17: '! " ; : ? * ( ) !;: ? ))( :!;* ("") ?!? :" **!! :!":?() )(:; !")" !! *)',
    18: '№№ %% == ++ // №% =+ №% =+ += %№ +№цм =дц% )цм№ +=+= %=% №=№№ //+ %ьд +',
};

// номер уровня
let indexLevel = 1;

// текущий уровнь
let currentLevel = levels[indexLevel];

// номер веденной буквы  
let index = 0;

// кладем подсказку текста в переменную
let placeholder = document.getElementById('invisibleText');

// кладем вводимый текст в переменную
let inputText = document.getElementById('field');

// номер индекса подсказки
let temp;

// ошибки
let mistakes = 0;

// время
let time = false;

let timeIndex = 0;

// скорость
let speed = 0;

// прогрессбар
let width = 0;

//кладем ссылку блока меню с успешным завершением уровня
const successBlock = document.getElementById('successBlock');

const failBlock = document.getElementById('failBlock');

//------------------ФУНКЦИИ------------------

// разделяем нашу стрку на отдельные символы (span)
function LevelToSpan(level) {
    for (var i = 0; i < level.length; i++) {
        var temp = document.createElement('span');
        temp.innerHTML = level[i];
        temp.id = i;
        placeholder.appendChild(temp);
    }
};

// подчеркивание ошибок
function redLine(temp) {
    temp.style.borderBottom = '2px solid red';
};

// убираем буквы подсказки
function whiteLetter(temp) {
    temp.style.color = '#ffffff00';
};

// функция отчистки
function Clear() {
    index = 0;
    inputText.value = null;
    inputLenght = 0;
    mistakes = 0;
    document.getElementById('mistakes').innerHTML = mistakes;
    time = false;
    timeIndex = 0;

    for (var i = 0; i < currentLevel.length; i++) {
        let temp = document.getElementById(i);
        temp.style.borderBottom = '0px solid red';
        temp.style.color = '#0000004d';
    }
};

//подсветка клавиш
function colorLight(event, color) {
    let keycap = document.getElementById(event.code);
    keycap.style.backgroundColor = color;

    setTimeout(function () {
        keycap.style.backgroundColor = '#454545';
        keycap.style.transitionDuration = '0.1s';
    }, 400);
};

// таймер
function timer() {
    const timer = document.getElementById('timer');
    let seconds = 0;
    let minutes = 0;
    let tmpMinutes = '0' + `${minutes}`;

    setInterval(function () {
        if (time === false) {
            clearInterval(interval);
            seconds = 0;
            minutes = 0;
            speedSec = 0;
            timer.innerHTML = '00:00';
            speed = 0;
            document.getElementById('speed').innerHTML = 0;

            if (parseInt(document.getElementById('speed').textContent) === 0) {
              document.getElementById('speed').style.position = 'relative';
              document.getElementById('speed').style.left = '0px';
            }
        }
    }, 1);

    let interval = setInterval(function () {
        if (seconds < 60) {
            seconds++;
            if (seconds < 10) {
                seconds = '0' + seconds;
            } else {
                seconds = seconds;
            }
        }
        if (seconds === 60 && minutes < 10) {
            seconds = '0' + 0;
            speedSec = 0;
            minutes++;
            tmpMinutes = '0' + minutes;
        } else if (seconds === 60 && minutes >= 9) {
            seconds = 0;
            speedSec = 0;
            tmpMinutes = minutes;
            minutes++;
        }

        timer.innerHTML = tmpMinutes + ':' + seconds;

        speed = Math.floor((60 / (minutes * 60 + seconds)) * (index > 1 ? index : 1));

        if (speed >= 999) {
            speed = 999;
        }

        if (speed >= 100) {
            document.getElementById('speed').style.position = 'relative';
            document.getElementById('speed').style.left = '-8px';
        };

        if(speed < 100 && speed > 10){
            document.getElementById('speed').style.position = 'relative';
            document.getElementById('speed').style.left = '-2px';
        }else if (speed < 10){
            document.getElementById('speed').style.position = 'relative';
            document.getElementById('speed').style.left = '4px';
            document.getElementById('speed').style.marginLeft = '0px';
        };

        document.getElementById('speed').innerHTML = speed;

    }, 1000);
}

//------------------ПЕРЕКЛЮЧАТЕЛИ И КНОПКИ------------------

//кнопка рестарта
document.getElementById('restart').onclick = function (event) {
    Clear();
    document.getElementById('footer').style.width = '0px';
    width = 0;
};

// фокус на инпуте
document.addEventListener('click', () => {
    document.getElementById('field').focus();
});

//правый переключатель
document.getElementById('right-arrow').onclick = function (event) {
    Clear();
    document.getElementById('footer').style.width = '0px';
    width = 0;
    indexLevel++;
    if (indexLevel > Object.keys(levels)[Object.keys(levels).length - 1]) {
        indexLevel = 1;
    }
    currentLevel = levels[indexLevel];
    for (var i = 0; i < currentLevel.length; i++) {
        document.getElementById(i).remove();
    }
    LevelToSpan(currentLevel);
    document.getElementById('ur').innerHTML = indexLevel;
    //levelMenu.innerHTML = indexLevel + ' уровень';
};

//левый переключатель
document.getElementById('left-arrow').onclick = function (event) {
    Clear();
    document.getElementById('footer').style.width = '0px';
    width = 0;
    indexLevel--;
    if (indexLevel < 1) {
        indexLevel = Object.keys(levels)[Object.keys(levels).length - 1];
    }
    currentLevel = levels[indexLevel];
    for (var i = 0; i < currentLevel.length; i++) {
        document.getElementById(i).remove();
    }
    LevelToSpan(currentLevel);
    document.getElementById('ur').innerHTML = indexLevel;
    //levelMenu.innerHTML = indexLevel + ' уровень';
};

// левел меню
document.addEventListener('click', (e) => {
    const levelMenu = document.getElementById('levelMenu');
    if (
        getComputedStyle(successBlock).display == 'none' &&
        getComputedStyle(failBlock).display == 'none'
    ) {
        if (e.target === document.getElementById('levels')) {
            levelMenu.classList.add('active');
        } else if (e.target === document.getElementById('level')) {
            levelMenu.classList.add('active');
        } else if (e.target === document.getElementById('ur')) {
            levelMenu.classList.add('active');
        } else {
            levelMenu.classList.remove('active');
        }
    } else if (
        getComputedStyle(failBlock).display == 'flex' ||
        getComputedStyle(successBlock).display == 'flex'
    ) {
        if (e.target === document.getElementById('levels')) {
            e.preventDefault();
        } else if (e.target === document.getElementById('level')) {
            e.preventDefault();
        } else if (e.target === document.getElementById('ur')) {
            e.preventDefault();
        } else {
            successBlock.classList.remove('anime');
            failBlock.classList.remove('anime');
        }
    }
});

// переключаем уровень в меню
document.getElementById('levelMenu').addEventListener('click', function (event) {
    const idLevels = [];
    let str = event.target;
    //console.log(event.target);
    //console.log(str.textContent.match(/\d+/));
    for (let key in levels) {
        idLevels.push(key);
    }
    idLevels.forEach((value) => {
        if (value === event.target.getAttribute('id')) {
            Clear();
            document.getElementById('footer').style.width = '0px';
            width = 0;
            indexLevel = value;
            console.log(indexLevel);
            currentLevel = levels[indexLevel];
            for (var i = 0; i < levels[value].length; i++) {
                document.getElementById(i).remove();
            }
            LevelToSpan(currentLevel);
            document.getElementById('ur').innerHTML = indexLevel;
            //levelMenu.innerHTML = value + ' уровень';
        } else if (str.tagName === 'LI') {
            Clear();
            document.getElementById('footer').style.width = '0px';
            width = 0;
            currentLevel = levels[parseInt(str.textContent.match(/\d+/))];
            indexLevel = parseInt(str.textContent.match(/\d+/));
            console.log(indexLevel);
            for (var i = 0; i < currentLevel.length; i++) {
                document.getElementById(i).remove();
            }
            LevelToSpan(currentLevel);
            document.getElementById('ur').innerHTML = parseInt(str.textContent.match(/\d+/));
            //levelMenu.innerHTML = parseInt(str.textContent.match(/\d+/)) + ' уровень';
        }
    });

});





//------------------ПРОГРАММА------------------

LevelToSpan(currentLevel);

let inputLenght = 0;

document.addEventListener('keydown',()=>{
    if (getComputedStyle(successBlock).display === 'flex'){
        successBlock.classList.remove('anime');
        setTimeout(()=>{
            inputText.focus();
        },1000);
    };

    if (getComputedStyle(failBlock).display === 'flex'){
        failBlock.classList.remove('anime');
        setTimeout(()=>{
            inputText.focus();
        },1000);
    };
});

inputText.addEventListener('keypress', function write(event) {

    index < currentLevel.length - 1 ? (index = inputText.value.length) : index = currentLevel.length; // номер введенной буквы

    temp = document.getElementById(index); // номер индекса подсказки

    (index < currentLevel.length) ? whiteLetter(temp) : false; // убираем буквы подсказки

    colorLight(event, '#0066FF');
    if (((event.key != currentLevel[index]) && (index < currentLevel.length))) {
        redLine(temp);
        colorLight(event, '#FF6B00');
        mistakes > currentLevel.length - 1 ? false : mistakes++;
        document.getElementById('mistakes').innerHTML = mistakes;
        document.getElementById('footer').classList.remove('gradik');
        document.getElementById('footer').classList.add('grad');
        setTimeout(() => {
        document.getElementById('footer').classList.remove('grad');
        document.getElementById('footer').classList.add('gradik');
      }, 1000);
    }else{
        width += 1.41;
        document.getElementById('footer').style.width = `${width}` + '%';
    };

    timeIndex++;

    timeIndex === 1 ? (time = true) && (timer()) : false;

    inputLenght = inputText.value.length;

    if ((event.code === 'Space' || event.code === 'Enter') && index <= currentLevel.length) {
        temp.style.color = '#0000004d';
    }

    

    if (index === currentLevel.length - 1) {
        inputText.removeEventListener('keypress', write);
        setTimeout(() => {
            inputText.addEventListener('keypress', write);
        }, 100);

    };


    console.log(width);

});

inputText.addEventListener('keydown', function (event) {
    if (event.code === 'Backspace') {
        colorLight(event, '#0066FF');
        temp = document.getElementById(index)
        temp.style.color = '#0000004d';
        temp.style.borderBottom = '0px solid red';
        index > 0 ? index-- : false;
        width > 1.41 ? width -= 1.41 : width = 0;
        document.getElementById('footer').style.width = `${width}` + '%';
        console.log(width);
    }
});

inputText.addEventListener('keydown', function (event) {
    if ((
        event.code === 'Tab' ||
        event.code === 'ShiftLeft' ||
        event.code === 'ControlLeft' ||
        event.code === 'ShiftRight' ||
        event.code === 'CapsLock'
    ) && event.code != 'ControlLeft') {
        colorLight(event, '#0066FF');
    };
});

// если мы дошли до края строки
inputText.addEventListener('keyup', function () {
    
    if (index >= currentLevel.length - 1) {
        if (mistakes < 4) {

            document.getElementById('success_mist').style.marginLeft = '18px';
            document.getElementById('success_mist').innerHTML = `${mistakes}`;

            Clear();
            document.getElementById('footer').style.width = '0px';
            width = 0;
            indexLevel++;
            console.log(indexLevel);

            (indexLevel > Object.keys(levels)[Object.keys(levels).length - 1]) ? indexLevel = 1 : false;
            currentLevel = levels[indexLevel];

            document.getElementById('ur').innerHTML = indexLevel;

            for (var i = 0; i < currentLevel.length; i++) {
                document.getElementById(i).remove();
            };

            LevelToSpan(currentLevel);

            successBlock.classList.add('anime');
            document.getElementById('success_speed').innerHTML = `${speed}`;

            inputText.blur();
        } else {

            document.getElementById('fail_mist').style.marginLeft = '8px';
            document.getElementById('fail_mist').innerHTML = `${mistakes}`;
            failBlock.classList.add('anime');
            document.getElementById('fail_speed').innerHTML = `${speed}`;
            console.log(indexLevel);
            Clear();
            document.getElementById('footer').style.width = '0px';
            width = 0;
            inputText.blur();
        };

    };
});


