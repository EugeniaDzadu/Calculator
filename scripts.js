// Variables to hold the current state
let currentExpression = '';   // Tracks the full expression (e.g., "8 + 2")
let currentInput = '';        // Tracks the current number being entered

// Get reference to the display
const mainDisplay = document.getElementById('main-display');

// Function to update the main display
function updateDisplay(value) {
  mainDisplay.value = value || '0';
}

// Function to handle number button clicks
function handleNumberClick(number) {
  currentInput += number; // Add the digit to the current number
  currentExpression += number; // Add it to the full expression
  updateDisplay(currentExpression); // Update the display with the expression
}

// Function to handle operator button clicks
function handleOperatorClick(op) {
  if (currentInput === '' && currentExpression === '') return; // Prevent invalid input
  if (currentInput === '' && currentExpression.slice(-1).match(/[+\-*/]/)) {
    // Replace the last operator if no number was entered
    currentExpression = currentExpression.slice(0, -1) + op;
  } else {
    currentExpression += ` ${op} `; // Add operator to the expression
  }
  currentInput = ''; // Reset current input for the next number
  updateDisplay(currentExpression); // Update the display
}

// Function to calculate the result
function calculate() {
  try {
    // Evaluate the expression safely using `eval`
    const result = eval(currentExpression.replace(/÷/g, '/').replace(/×/g, '*'));
    currentExpression = `${currentExpression} = ${result}`;
    updateDisplay(currentExpression); // Display the full expression with the result
    currentExpression = result.toString(); // Prepare result for next calculation
    currentInput = ''; // Clear current input
  } catch (error) {
    updateDisplay('Error'); // Show error for invalid expressions
    currentExpression = '';
    currentInput = '';
  }
}

// Function to clear all inputs
function clearAll() {
  currentExpression = '';
  currentInput = '';
  updateDisplay('');
}

// Add event listeners to all buttons
document.querySelectorAll('button[data-value]').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (!isNaN(value)) handleNumberClick(value); // If it's a number
    else handleOperatorClick(value); // If it's an operator
  });
});

// Add event listener for the equals button
document.getElementById('equals').addEventListener('click', calculate);

// Add event listener for the clear button
document.getElementById('clear').addEventListener('click', clearAll);
