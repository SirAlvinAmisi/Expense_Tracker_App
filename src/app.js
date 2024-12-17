// Selectors for various DOM elements
// Get references to the form and input fields for expenses
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseList = document.getElementById("expense-list");
const totalExpensesEl = document.getElementById("total-expenses");
const filterCategory = document.getElementById("filter-category");
const sortOption = document.getElementById("sort-option");
const currencySelect = document.getElementById("currency");
const convertButton = document.getElementById("convert-button");
const convertedAmountEl = document.getElementById("converted-amount");

// Local storage key for saving expenses
const LOCAL_STORAGE_KEY = "expenses";

// State to hold expenses
let expenses = [];

// Constants for API
const API_URL = `https://v6.exchangerate-api.com/v6/a95d91c87568404107cbd9fc/latest/KES`;

// -------------------- Expense Logic -------------------- //

// Load expenses from localStorage when the app starts
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve stored expenses from local storage
  const storedExpenses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (storedExpenses) {
    expenses = storedExpenses; // Set the expenses state
    renderExpenses(); // Render the expenses on the page
    updateTotalExpenses(); // Update the total expenses display
  }
});

// Add Expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission
  const name = expenseNameInput.value.trim(); // Get the expense name
  const amount = parseFloat(expenseAmountInput.value); // Get the expense amount
  const category = expenseCategoryInput.value; // Get the expense category

  // Validate input
  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense name and a positive amount!"); // More specific alert
    return;
  }

  // Create a new expense object
  const newExpense = {
    id: Date.now(), // Unique ID based on current timestamp
    name,
    amount,
    category,
    date: new Date().toISOString(), // Current date in ISO format
  };

  expenses.push(newExpense); // Add the new expense to the state
  saveExpenses(); // Save updated expenses to local storage
  renderExpenses(); // Render the updated expenses list
  updateTotalExpenses(); // Update the total expenses display
  expenseForm.reset(); // Reset the form fields
});

// Delete Expense
function deleteExpense(id) {
  // Filter out the expense with the given ID
  expenses = expenses.filter((expense) => expense.id !== id);
  saveExpenses(); // Save updated expenses to local storage
  renderExpenses(); // Render the updated expenses list
  updateTotalExpenses(); // Update the total expenses display
}

// Edit Expense
function editExpense(id) {
  const expenseToEdit = expenses.find((expense) => expense.id === id); // Find the expense to edit
  if (!expenseToEdit) return; // Exit if not found

  // Pre-fill the form with existing data
  expenseNameInput.value = expenseToEdit.name;
  expenseAmountInput.value = expenseToEdit.amount;
  expenseCategoryInput.value = expenseToEdit.category;

  // Remove the expense from the list and update state
  expenses = expenses.filter((expense) => expense.id !== id);
  saveExpenses(); // Save updated expenses to local storage
  renderExpenses(); // Render the updated expenses list
  updateTotalExpenses(); // Update the total expenses display
}

// Render Expenses List
function renderExpenses() {
  expenseList.innerHTML = ""; // Clear current list
  let filteredExpenses = getFilteredExpenses(); // Get filtered expenses

  // Apply Sorting
  filteredExpenses.sort((a, b) => sortExpenses(a, b)); // Sort expenses

  // Populate the expenses list
  filteredExpenses.forEach(renderExpenseItem); // Render each expense item
}

// Get filtered expenses
function getFilteredExpenses() {
  const selectedCategory = filterCategory.value; // Get selected category
  return selectedCategory !== "All" 
    ? expenses.filter((expense) => expense.category === selectedCategory) 
    : [...expenses]; // Return all expenses if "All" is selected
}

// Sort expenses
function sortExpenses(a, b) {
  const sortBy = sortOption.value; // Get selected sort option
  if (sortBy === "amount") return b.amount - a.amount; // Sort by amount
  if (sortBy === "date") return new Date(b.date) - new Date(a.date); // Sort by date
  if (sortBy === "category") return a.category.localeCompare(b.category); // Sort by category
  return 0; // Default case if no valid sort option is selected
}

// Render individual expense item
function renderExpenseItem(expense) {
  const listItem = document.createElement("li"); // Create a new list item
  listItem.innerHTML = `
    <span><strong>${expense.name}</strong> - KES ${expense.amount.toFixed(2)} (${expense.category})</span>
    <span>${new Date(expense.date).toLocaleDateString()}</span>
    <button onclick="editExpense(${expense.id})">Edit</button>
    <button onclick="deleteExpense(${expense.id})">Delete</button>
  `;
  expenseList.appendChild(listItem); // Add the list item to the expense list
}

// Update Total Expenses
function updateTotalExpenses() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0); // Calculate total expenses
  totalExpensesEl.textContent = total.toFixed(2); // Update the total expenses display
}

// Save Expenses to Local Storage
function saveExpenses() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses)); // Save expenses to local storage
}

// -------------------- Currency Conversion -------------------- //

// Fetch and convert total expenses to another currency
convertButton.addEventListener("click", async () => {
  const targetCurrency = currencySelect.value; // Get selected target currency
  const totalKES = parseFloat(totalExpensesEl.textContent); // Get total expenses in KES

  // Validate total expenses
  if (isNaN(totalKES) || totalKES <= 0) {
    alert("No expenses to convert!"); // Alert if no expenses to convert
    return;
  }

  try {
    // Fetch exchange rates from the API
    const apiUrl = API_URL; // Use constant for API URL
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates"); // Handle fetch error
    }
    const data = await response.json(); // Parse the response data
    const conversionRate = data.conversion_rates[targetCurrency]; // Get the conversion rate

    // Validate conversion rate
    if (!conversionRate) {
      alert("Invalid target currency selected!"); // Alert if invalid currency
      return;
    }

    const convertedAmount = totalKES * conversionRate; // Convert total expenses
    convertedAmountEl.textContent = `${convertedAmount.toFixed(
      2
    )} ${targetCurrency}`; // Display converted amount
  } catch (error) {
    console.error("Error fetching exchange rates:", error); // Log error
    alert("Failed to convert currency. Please try again later."); // Alert on error
  }
});
