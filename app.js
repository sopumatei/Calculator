// CALCULATOR VARIABLES
let currentNumber = 0;
let leftOperand = 0;
let canAddToEquation = true;
let firstOperand = true;
let canEqual = true;

// INPUT VARIABLES
const currentEquationTxt = document.getElementById('current-equation');
const currentNumberTxt = document.getElementById('current-number');

// OPERATION BUTTONS
const addBtn = document.getElementById('add-button');
const subBtn = document.getElementById('subtract-button');
const multiplyBtn = document.getElementById('multiply-button');
const divBtn = document.getElementById('divide-button');
const equalBtn = document.getElementById('equal-button');
const decimalBtn = document.getElementById('decimal-button');
const clearBtn = document.getElementById('clear-button');
const allClearBtn = document.getElementById('all-clear-button');

// NUMBER BUTTONS
const numberBtn = document.querySelectorAll('.number');
numberBtn.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});

// FUNCTIONS
function appendNumber(number) {
    canEqual = true;
    if(!canAddToEquation) {
        canAddToEquation = true;
        currentNumberTxt.textContent = '0';
    }

    if(currentNumberTxt.textContent === '0' && number !== '.')
        currentNumberTxt.textContent = number;
    else
        currentNumberTxt.textContent += number;

    currentNumber = parseFloat(currentNumberTxt.textContent);
}

function deleteNr() {
    currentNumberTxt.textContent = currentNumberTxt.textContent.slice(0, currentNumberTxt.textContent.length - 1);
    if(currentNumberTxt.textContent === '')
        currentNumberTxt.textContent = '0';

    currentNumber = parseFloat(currentNumberTxt.textContent);
}

function deleteAll() {
    canEqual = true;
    leftOperand = 0;
    currentNumber = 0;
    currentNumberTxt.textContent = '0';
    currentEquationTxt.textContent = '';
}

function addNumberToEquation(sign) {
    if(firstOperand) {
        firstOperand = false;
        leftOperand = parseFloat(currentNumberTxt.textContent);
    }
    else if(currentEquationTxt.textContent.includes('+') && canAddToEquation) {
        leftOperand += parseFloat(currentNumberTxt.textContent);
    }
    else if(currentEquationTxt.textContent.includes('-') && canAddToEquation) {
        leftOperand -= parseFloat(currentNumberTxt.textContent);
    }
    else if(currentEquationTxt.textContent.includes(convertKeyboardToMath('/')) && canAddToEquation) {
        leftOperand /= parseFloat(currentNumberTxt.textContent);
    }
    else if(currentEquationTxt.textContent.includes(convertKeyboardToMath('*')) && canAddToEquation) {
        leftOperand *= parseFloat(currentNumberTxt.textContent);
    }

    currentEquationTxt.textContent = leftOperand + " " + convertKeyboardToMath(sign);
    canAddToEquation = false;
}

function convertKeyboardToMath(sign) {
    if(sign === '+') return '+';
    if(sign === '-') return '-';
    if(sign === '*') return 'x';
    if(sign === '/') return '÷';
}

// BUTTONS EVENTS
clearBtn.addEventListener('click', deleteNr);
allClearBtn.addEventListener('click', deleteAll);
decimalBtn.addEventListener('click', () => appendNumber('.'));

addBtn.addEventListener('click', () => {
    addNumberToEquation('+');
});

subBtn.addEventListener('click', () => {
    addNumberToEquation('-');
});

multiplyBtn.addEventListener('click', () => {
    addNumberToEquation('*');
});

divBtn.addEventListener('click', () => {
    addNumberToEquation('/');
});

equalBtn.addEventListener('click', () => {
    if(canEqual) {
        currentEquationTxt.textContent += " " + currentNumberTxt.textContent + " =";
        let result = parseFloat(currentNumberTxt.textContent);
        if(currentEquationTxt.textContent.includes('+')) {
            result = leftOperand + parseFloat(currentNumberTxt.textContent);
        }
        else if(currentEquationTxt.textContent.includes('-') && canAddToEquation) {
            result = leftOperand - parseFloat(currentNumberTxt.textContent);
        }
        else if(currentEquationTxt.textContent.includes(convertKeyboardToMath('/')) && canAddToEquation) {
            result = leftOperand / parseFloat(currentNumberTxt.textContent);
        }
        else if(currentEquationTxt.textContent.includes(convertKeyboardToMath('*')) && canAddToEquation) {
            result = leftOperand * parseFloat(currentNumberTxt.textContent);
        }
        
        canAddToEquation = false;
        currentNumberTxt.textContent = result;
        firstOperand = true;
        canEqual = false;
    }
})

