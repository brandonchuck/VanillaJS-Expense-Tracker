document.querySelector('.expense-form').addEventListener('submit', createRow);

function createRow(e){
  e.preventDefault();

  // Input values
  const currency = document.querySelector('.currency').value;
  const description = document.querySelector('.description').value;
  const date = document.querySelector('.date').value;
  const amount = document.querySelector('.amount').value;
  const purchaseLocation = document.querySelector('.location').value;
  const removeBtn = document.createElement('button');
  
  const rowData = [currency, date, description, purchaseLocation, amount, removeBtn];
  
  const newRow = document.querySelector('.data-table').insertRow();
  newRow.className = "row";

  for (i = 0; i < rowData.length; i++){
    const newCell = newRow.insertCell();

    if (i === rowData.length - 1){
      const removeButton = createRemoveButton(newRow);
      newCell.appendChild(removeButton);
    } else {
      newCell.textContent = rowData[i];
    }
  }
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