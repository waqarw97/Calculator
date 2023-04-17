let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = '';


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
      console.error("Cannot divide by zero");
      return null;
  }
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
      case '+':
          return add(num1, num2);
      case '-':
          return subtract(num1, num2);
      case '*':
          return multiply(num1, num2);
      case '/':
          return divide(num1, num2);
      default:
          console.error("Invalid operator");
          return null;
  }
}

function updateDisplay(value, overwrite = false) {
  const display = document.getElementById('display');
  if (overwrite) {
      displayValue = value.toString();
  } else {
      displayValue += value;
  }
  display.value = displayValue;
}


document.querySelectorAll('.buttons button').forEach(button => {
  if (button.textContent.match(/[0-9.]/)) {
      button.addEventListener('click', () => {
          updateDisplay(button.textContent);
      });
  }
});

function handleOperatorClick(op) {
  if (firstNumber === null) {
      firstNumber = parseFloat(displayValue);
      operator = op;
      updateDisplay(operator, true);
      displayValue = '';
  } else if (operator && displayValue) {
      secondNumber = parseFloat(displayValue);
      const result = operate(operator, firstNumber, secondNumber);
      updateDisplay(result);
      firstNumber = result;
      operator = op;
      updateDisplay(operator, true);
      displayValue = '';
  }
}


document.getElementById('clear').addEventListener('click', () => {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = '';
  updateDisplay('');
});

document.querySelectorAll('.buttons button').forEach(button => {
  if (button.textContent.match(/[\/*\-+]/)) {
      button.addEventListener('click', () => {
          handleOperatorClick(button.textContent);
      });
  } else if (button.textContent === '=') {
      button.addEventListener('click', () => {
          if (firstNumber !== null && operator && displayValue) {
              secondNumber = parseFloat(displayValue);
              const result = operate(operator, firstNumber, secondNumber);
              updateDisplay(result, true);
              firstNumber = null;
              operator = null;
              displayValue = '';
          }
      });
  }
});
