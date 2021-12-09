const form = document.querySelector(".expense-form");

// User inputs
const currency = document.querySelector(".currency");
const date = document.querySelector(".date");
const description = document.querySelector(".description");
const purchaseLocation = document.querySelector(".location");
const amount = document.querySelector(".amount");
const removeBtn = document.createElement("button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExpense = {
    id: Math.floor(Math.random() * 1000),
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
  expenseArray = getExpenseArray();
  expenseArray.push(expense);
  saveExpense(expenseArray);
}

function getExpenseArray() {
  return JSON.parse(localStorage.getItem("expenseArray")) || [];
}

// set expenseArray in local storage
function saveExpense(array) {
  localStorage.setItem("expenseArray", JSON.stringify(array));
}

function createTableRow() {
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("class", "row");
  return tableRow;
}

function addExpenseRow(expense) {
  const tableBody = document.getElementById("data-table");
  const tableRow = createTableRow();
  tableBody.appendChild(tableRow);

  // create cells
  const expenseTypeCell = createTableCell(expense.currency);
  const expenseDateCell = createTableCell(expense.date);
  const expenseDescriptionCell = createTableCell(expense.description);
  const expenseLocationCell = createTableCell(expense.purchaseLocation);
  const expenseAmountCell = createTableCell(expense.amount);
  const deleteCell = createTableCell();
  deleteCell.setAttribute("id", "remove-cell");

  // append cells to table row
  tableRow.appendChild(expenseTypeCell);
  tableRow.appendChild(expenseDateCell);
  tableRow.appendChild(expenseDescriptionCell);
  tableRow.appendChild(expenseLocationCell);
  tableRow.appendChild(expenseAmountCell);
  tableRow.appendChild(deleteCell);

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

  // remove expense from local storage
  expenseArray = getExpenseArray();
  expenseArray = expenseArray.filter((expense) => {
    return expense.id !== id;
  });
  saveExpense(expenseArray); // save modified array to local storage
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
    addExpenseRow(expense);
  });
});
