function add(...numbers) {
  return numbers.reduce((sum, nextNum) => sum + nextNum);
}

function subtract(...numbers) {
  return numbers.reduce((difference, nextNum) => difference - nextNum);
}

function multiply(...numbers) {
  return numbers.reduce((product, nextNum) => product * nextNum);
}

function divide(...numbers) {
  return numbers.reduce((quotient, nextNum) => quotient / nextNum);
}

function equals(...numbers) {
  return [...numbers][0];
}

function operate(operator, ...numbers) {
  return operator(...numbers);
}

const displayOutput = document.querySelector('.display__output');
const digitButtons = document.querySelectorAll('.digits > button');
const operatorButtons = document.querySelectorAll('.operators > .operators__arithmetic');
const equalsButton = document.querySelector('.operators > .operators__equals');
const clearButton = document.querySelector('.options > .options__clear');
const decimalButton = document.querySelector('.digits > .digits__decimal');
const changeSignButton = document.querySelector('.options .options__change-sign');
const percentButton = document.querySelector('.options .options__percent');
const backspaceButton = document.querySelector('.backspace');
let currentValue = 0;
let storedValue = '';
let storedOperator = '';

displayOutput.textContent = currentValue;

function appendDigit(digit) {
  if (storedOperator.name === 'equals') {
    currentValue = 0;
    storedOperator = '';
  }
  if (currentValue === 0) {
    currentValue = digit;
  } else {
    if (!(digit === '.' && currentValue.includes('.'))) {
      currentValue += digit;
    }
  }
  displayOutput.textContent = (currentValue.toString().length <= 8) ? currentValue : (+currentValue).toExponential(6);
}


digitButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    appendDigit(e.target.getAttribute('data-key'));
  });
})

function roundNumber(number, length) {
  if (!Number.isInteger(number)) {
    number = number.toPrecision(length);
  }
  return number;
}


operatorButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (storedOperator) {
      let computedValue = operate(storedOperator, +storedValue, +currentValue);
      if (computedValue === Infinity) {
        currentValue = 0;
        displayOutput.textContent = `No div'n by 0`;
      } else {
        currentValue = roundNumber(computedValue, 10);
        displayOutput.textContent = (currentValue.toString().length <= 8) ? currentValue : (+currentValue).toExponential(6);
      }
    }
    storedOperator = window[e.target.getAttribute('data-operation')];
    storedValue = currentValue;
    currentValue = 0;
  })
});

equalsButton.addEventListener('click', (e) => {
  if (storedOperator) {
    let computedValue = operate(storedOperator, +storedValue, +currentValue);
    if (computedValue === Infinity) {
      currentValue = 0;
      displayOutput.textContent = `No div'n by 0`;
    } else {
      currentValue = roundNumber(computedValue, 10);
      displayOutput.textContent = (currentValue.toString().length <= 8) ? currentValue : (+currentValue).toExponential(6);
    }
  }
  storedOperator = window[e.target.getAttribute('data-operation')];
  storedValue = currentValue;
});

clearButton.addEventListener('click', () => {
  storedValue = '';
  storedOperator = '';
  currentValue = 0;
  displayOutput.textContent = currentValue;
})

changeSignButton.addEventListener('click', () => {
  currentValue = -currentValue;
  displayOutput.textContent = (currentValue.toString().length <= 8) ? currentValue : (+currentValue).toExponential(6);
})

percentButton.addEventListener('click', () => {
  currentValue /= 100;
  displayOutput.textContent = (currentValue.toString().length <= 8) ? currentValue : (+currentValue).toExponential(6);
})

backspaceButton.addEventListener('click', () => {
  currentValue = currentValue.toString().slice(0, -1);
  if (!currentValue) {
    currentValue = 0;
  }
  displayOutput.textContent = (currentValue.toString().length <= 8) ? currentValue : (+currentValue).toExponential(6);
})

window.addEventListener('keydown', (e) => {
  const key = document.querySelector(`button[data-key="${e.key}"]`);
  if (!key) return;
  key.click();
})