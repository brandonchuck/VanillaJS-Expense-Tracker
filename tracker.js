const form = document.querySelector(".expense-form");

// User Input values
const currency = document.querySelector(".currency");
const date = document.querySelector(".date");
const description = document.querySelector(".description");
const purchaseLocation = document.querySelector(".location");
const amount = document.querySelector(".amount");
const removeBtn = document.createElement("button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExpense = {
    currency: displayCurrency(currency.value),
    date: date.value,
    description: description.value,
    purchaseLocation: purchaseLocation.value,
    amount: formatAmount(amount.value),
  };

  addExpense(newExpense);
});

function addExpense(expense) {
  addExpenseRow(expense);
  expenseArray = getExpenseArray(); // returns expenses in local storage
  expenseArray.push(expense);
  saveExpense(expenseArray);
}

// getter for expense array in local storage
function getExpenseArray() {
  return JSON.parse(localStorage.getItem("expenseArray")) || [];
}

// setter for expense array in local storage
function saveExpense(array) {
  localStorage.setItem("expenseArray", JSON.stringify(array));
}

// generate new table row
function createTableRow() {
  const tableRow = document.createElement("tr"); // create table row
  tableRow.setAttribute("class", "row");
  return tableRow;
}

function addExpenseRow(expense) {
  const tableBody = document.getElementById("data-table"); // grab table body from html
  const tableRow = createTableRow(); // create table row
  tableBody.appendChild(tableRow); // append row to table body

  // create cells
  const expenseTypeCell = createTableCell(expense.currency);
  const expenseDateCell = createTableCell(expense.date);
  const expenseDescriptionCell = createTableCell(expense.description);
  const expenseLocationCell = createTableCell(expense.purchaseLocation);
  const expenseAmountCell = createTableCell(expense.amount);
  const deleteCell = createTableCell();

  // append cells to table row
  tableBody.appendChild(expenseTypeCell);
  tableBody.appendChild(expenseDateCell);
  tableBody.appendChild(expenseDescriptionCell);
  tableBody.appendChild(expenseLocationCell);
  tableBody.appendChild(expenseAmountCell);
  tableBody.appendChild(deleteCell);

  const deletebutton = createDeleteButton(expense);
  deleteCell.appendChild(deletebutton);

  form.reset();
}

function createTableCell(expenseColumn) {
  const dataCell = document.createElement("td");
  dataCell.textContent = expenseColumn;
  return dataCell;
}

function createDeleteButton(expense) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", () => {
    removeExpense(deleteButton, expense.id);
  });
  return deleteButton;
}

function removeExpense(element, id) {
  element.parentElement.parentElement.remove(); // remove expense from DOM
  expenseArray = getExpenseArray();
  expenseArray = expenseArray.filter((expense) => {
    return expense.id !== id;
  });
  saveExpense(expenseArray); // override expense array in local storage with shortened array
}

function formatAmount(amount) {
  return `$${amount}`;
}

function displayCurrency(currency) {
  switch (currency) {
    case "Cash":
      return '<i class="bi bi-cash-coin"></i>';
    case "Card":
      return '<i class="bi bi-credit-card-2-back"></i>';
    case "Crypto":
      return '<i class="bi bi-currency-bitcoin"></i>';
    case "Other":
      return "Other";
  }
}

window.addEventListener("load", (e) => {
  e.preventDefault();
  expenseArray = getExpenseArray();
  expenseArray.forEach((expense) => {
    addExpenseRow(expense); // grabs expense rows in local storage and adds them back to table using addExpenseRow function
  });
});
