const numbers = document.querySelectorAll(".number");
const result = document.querySelector(".result");
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals");
const clear = document.getElementById("clear");
const negative = document.querySelector(".negative");
const percent = document.getElementById("percent");
const dot = document.getElementById("dot");


let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute('value');
        if (!isFirstValue || (isFirstValue && !sign)) {
            getFirstValue(atr);
        } else {
            getSecondValue(atr);
            isSecondValue = true;
        }
    });
}

function getFirstValue(el) {
    if (isFirstValue && !sign) {
        firstValue = ""; 
    }
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
}

function getSecondValue(el) {
    if (sign !== "") {
        result.innerHTML = "";
        secondValue += el;
        result.innerHTML = secondValue;
    }
}

function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            if (firstValue !== "") {
                sign = e.target.getAttribute('value');
                isFirstValue = true;
            }
        });
    }
}
getSign();

equals.addEventListener('click', () => {
    if (firstValue !== "" && secondValue !== "" && sign !== "") {
        result.innerHTML = "";
        switch (sign) {
            case "+":
                resultValue = +firstValue + +secondValue;
                break;
            case "-":
                resultValue = firstValue - secondValue;
                break;
            case "x":
                resultValue = firstValue * secondValue;
                break;
            case "÷":
                resultValue = firstValue / secondValue;
                break;
        }
        result.innerHTML = resultValue;
        firstValue = resultValue.toString(); // Will be maintained in the rest of the code as ans in real calculators
        secondValue = "";
        sign = "";
        isSecondValue = false;
        checkResultLength();
    }
});

function checkResultLength() {
    resultValue = JSON.stringify(resultValue);
    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (isSecondValue && secondValue !== "") {
        secondValue = (-secondValue).toString();
        result.innerHTML = secondValue;
    } else if (firstValue !== "") {
        firstValue = (-firstValue).toString();
        result.innerHTML = firstValue;
    }
});

percent.addEventListener('click', () => {
    result.innerHTML = "";
    if (isSecondValue && secondValue !== "") {
        secondValue = (secondValue / 100).toString();
        result.innerHTML = secondValue;
    } else if (firstValue !== "") {
        firstValue = (firstValue / 100).toString();
        result.innerHTML = firstValue;
    }
});

dot.addEventListener('click', (e) => {
    let atr = e.target.getAttribute('value');
    if (!isFirstValue || (isFirstValue && !sign)) {
        getFirstValue(atr);
    } else {
        getSecondValue(atr);
        isSecondValue = true; 
    }
});

clear.addEventListener('click', () => {
    console.log("AC is working");
    result.innerHTML = 0;
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
});
