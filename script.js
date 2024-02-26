/* 
PSUEDOCODE

FUNCTION add
    INPUT number1, number2
    RETURN number1 + number2

FUNCTION subtract
    INPUT number1, number2
    RETURN number1 - number2

FUNCTION multiply
    INPUT number1, number2
    RETURN number1 * number2

FUNCTION divide
    INPUT number1, number2
    RETURN number1 / number2

FUNCTION operate
    INPUT number1, operand, number2
        INIT solution

        IF operand == * 
*/

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

function operate (num1, num2, operand) {
    switch (operand) {
        case '+': return add(num1, num2);

        case '-': return subtract(num1, num2);

        case '*': return multiply(num1, num2);

        case '/': return divide(num1, num2);
    }
}
