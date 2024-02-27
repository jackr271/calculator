// calculator states
const GETTING_FIRST_NUM = 1; // filling input string, yet to hit operator button
const GETTING_NEW_OPERATOR = 2; // filling input string, yet to hit equal or another operator button
const GETTING_NEW_NUMBER = 3; //

let state = GETTING_FIRST_NUM;

// inputs

let inputString = '';
let num1 = null;
let num2 = null;
let operand = null;

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate (first, second, operator) {
    switch (operator) {
        case '+': return add(first, second);

        case '-': return subtract(first, second);

        case '×': return multiply(first, second);

        case '÷': return divide(first, second);

        default: return first; // hit equals without choosing an operand
    }
}

function updateDisplay() {
    const display = document.querySelector(".display text");

    if (state == GETTING_FIRST_NUM) {
        display.textContent = inputString;
    }
    else if (state == GETTING_NEW_NUMBER) {
        //console.log("here i am");
        display.textContent = `${num1}${operand}${inputString}`;
    }
    else if (state == GETTING_NEW_OPERATOR) {
        display.textContent = `${num1}`;
    }
}


const keypad = document.querySelector('.keypad');
keypad.addEventListener('click', (Event) => {
    const target = Event.target;
    console.log(`clicked ${target.textContent} in state: ${state}`);
    if (target.id == 'clear') {
        clear();
    }
    else {
        callControl(target);
    }
}); // if (target.type == 'button')

function callControl (target) {
    let text = target.textContent;
    if ((text == '÷') || (text == '×') || (text == '+') || (text == '-') || (text == '=')) {
        switch (state) {
            case GETTING_FIRST_NUM:
                    if (inputString == '' || text == '=') {
                    return;
                } 
                else setFirstNumber(text);
                break;
            
            case GETTING_NEW_NUMBER: if (inputString == '') {
                    setOperand(text);
                }
                else {
                    evaluateEquation(text);
                }
                break;
            case GETTING_NEW_OPERATOR: if (text == '=') {
                    evaluateEquation(operand);
                }
                else {
                    state = GETTING_NEW_NUMBER;
                    setOperand(text);
                }
                break;
        }
    }
    else if (Number.isInteger(+text) && (state == GETTING_FIRST_NUM || state == GETTING_NEW_NUMBER)) { // need to get an operator if in this state
        inputString = inputString + text;
        updateDisplay();
    }
}

// state-changing functions

function clear () {
    state = GETTING_FIRST_NUM;
    inputString = '';
    num1 = null;
    num2 = null;
    operand = null;
    updateDisplay();
}

function setFirstNumber (operandString) { // initiated by clicking an operator button
    //console.log("madde it");
    num1 = inputString;
    operand = operandString;
    inputString = '';
    state = GETTING_NEW_NUMBER;
    updateDisplay();
}

function setOperand (operandString) { // changing operand before calculation
    operand = operandString;
    updateDisplay();
}

function evaluateEquation (buttonString) {
    num2 = inputString;
    num1 = operate(+num1, +num2, operand);
    state = GETTING_NEW_OPERATOR;
    if (buttonString != '=') {
        operand = buttonString;
        state = GETTING_NEW_NUMBER;
    }
    inputString = '';
    updateDisplay();
}