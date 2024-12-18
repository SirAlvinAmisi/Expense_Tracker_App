// Expense Tracker App - JavaScript
// Functionality includes: Adding, editing, deleting expenses, filtering, sorting, API currency conversion, and local storage.

// Global Variables
let expenses = []; // Array to hold expense objects
const expenseForm = document.getElementById('expense-form'); // Form to add expenses
const expenseList = document.getElementById('expense-list'); // UL element for expense list
const totalExpensesElement = document.getElementById('total-expenses'); // Display total expenses in KES
const filterCategory = document.getElementById('filter-category'); // Dropdown to filter by category
const sortOption = document.getElementById('sort-option'); // Dropdown to sort expenses
const convertButton = document.getElementById('convert-button'); // Button to convert total expenses
const currencyDropdown = document.getElementById('currency'); // Dropdown to select currency
const convertedAmountElement = document.getElementById('converted-amount'); // Display converted total expenses

// Event Listener: Handle form submission
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addExpense();
});

// Function: Add a new expense
function addExpense() {
  const name = document.getElementById('expense-name').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;
  const date = new Date().toISOString(); // Automatically set the current date

  if (name && amount > 0) {
    const expense = { id: Date.now(), name, amount, category, date };
    expenses.push(expense); // Add expense to the array
    saveToLocalStorage(); // Save updated expenses to local storage
    renderExpenses(); // Update the UI
    expenseForm.reset(); // Clear the form
  } else {
    alert('Please fill out all fields correctly!');
  }
}

// Function: Render expenses to the DOM
function renderExpenses(filteredExpenses = expenses) {
  expenseList.innerHTML = ''; // Clear current list
  filteredExpenses.forEach((expense) => {
    const listItem = document.createElement('li');
    listItem.classList.add('expense-item');
    listItem.innerHTML = `
      <span><strong>${expense.name}</strong> - ${expense.amount} KES (${expense.category})</span>
      <div>
        <button onclick="editExpense(${expense.id})">Edit</button>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
      </div>
    `;
    expenseList.appendChild(listItem);
  });
  updateTotal();
}

// Function: Edit an existing expense
function editExpense(id) {
  const expense = expenses.find((exp) => exp.id === id);
  if (expense) {
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;
    deleteExpense(id); // Remove the old entry before re-adding the updated one
  }
}

// Function: Delete an expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  saveToLocalStorage(); // Save updated expenses to local storage
  renderExpenses(); // Update the UI
}

// Function: Update total expenses
function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpensesElement.textContent = total.toFixed(2); // Display total in KES
}

// Function: Filter expenses by category
filterCategory.addEventListener('change', () => {
  const category = filterCategory.value;
  const filteredExpenses = category === 'All' ? expenses : expenses.filter((exp) => exp.category === category);
  renderExpenses(filteredExpenses);
});

// Function: Sort expenses
sortOption.addEventListener('change', () => {
  const option = sortOption.value;
  let sortedExpenses = [...expenses];
  if (option === 'date') {
    sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (option === 'amount') {
    sortedExpenses.sort((a, b) => a.amount - b.amount);
  } else if (option === 'category') {
    sortedExpenses.sort((a, b) => a.category.localeCompare(b.category));
  }
  renderExpenses(sortedExpenses);
});

// Function: Convert total expenses to another currency
convertButton.addEventListener('click', () => {
  const currency = currencyDropdown.value;
  const totalKES = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  fetchExchangeRate(currency, totalKES);
});

// Function: Fetch exchange rate from API
function fetchExchangeRate(targetCurrency, amountKES) {
  const apiUrl = `https://v6.exchangerate-api.com/v6/a95d91c87568404107cbd9fc/latest/KES`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[targetCurrency];
      if (rate) {
        const convertedAmount = amountKES * rate;
        convertedAmountElement.textContent = `${convertedAmount.toFixed(2)} ${targetCurrency}`;
      } else {
        alert('Failed to fetch exchange rate. Please try again later.');
      }
    })
    .catch((error) => {
      console.error('Error fetching exchange rate:', error);
      alert('An error occurred while fetching the exchange rate.');
    });
}

// Function: Save expenses to local storage
function saveToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function: Load expenses from local storage
function loadFromLocalStorage() {
  const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
  if (storedExpenses) {
    expenses = storedExpenses;
    renderExpenses();
  }
}

// Initial Load: Load expenses from local storage and render
loadFromLocalStorage();
