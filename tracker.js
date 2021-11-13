const form = document.querySelector('.expense-form');
form.addEventListener('submit', createRow);

function createRow(e){
  e.preventDefault();

  // Input values
  const currency = displayCurrency(document.querySelector('.currency').value);
  const date = document.querySelector('.date').value;
  const description = document.querySelector('.description').value;
  const purchaseLocation = document.querySelector('.location').value;
  const amount = formatAmount(document.querySelector('.amount').value);
  const removeBtn = document.createElement('button');
  
  const rowData = [currency, date, description, purchaseLocation, amount, removeBtn];
  
  const newRow = document.querySelector('.data-table').insertRow();
  newRow.className = "row";

  for (i = 0; i < rowData.length; i++){
    const newCell = newRow.insertCell();

    if (i === rowData.length - 1){
      const removeButton = createRemoveButton(newRow);
      newCell.appendChild(removeButton);
      newCell.className = 'remove-cell';
    } else {
      newCell.innerHTML = rowData[i];
      newCell.className = 'data-cell';
    }
  }

  form.reset();
}

function createRemoveButton(row){
  const removeButton = document.createElement('button');
  removeButton.textContent = "X";
  removeButton.className = "remove-btn";
  removeButton.addEventListener('click', () => {
    removeExpense(row);
  });
  return removeButton;
}

function removeExpense(row){
  row.remove();
}

function formatAmount(amount){
  return `$${amount}`;
}

function displayCurrency(currency){
  switch(currency){
    case "Cash":
      return currency = '<i class="bi bi-cash-coin"></i>';
    case "Card":
      return currency = '<i class="bi bi-credit-card-2-back"></i>';
    case "Crypto":
      return currency = '<i class="bi bi-currency-bitcoin"></i>';
    case "Other":
      return currency = 'Other';
  }
}