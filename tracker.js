const expenseForm = document.querySelector('.expense-form');
expenseForm.addEventListener('submit', addExpense);

const dataTable = document.querySelector('.data-table');


// add expense to table
function addExpense(e){
  e.preventDefault();  

  const currency = document.querySelector('.currency').value;
  const description = document.querySelector('.description').value;
  const date = document.querySelector('.date').value;
  const amount = document.querySelector('.amount').value;
  const purchaseLocation = document.querySelector('.location').value;
  
  const removeBtn = document.createElement('button');

  const trackerArray = [currency, description, date, amount, purchaseLocation, removeBtn];


  const newRow = dataTable.insertRow();
  newRow.className = "row";

  // for each val in trackerArray, create new cell and append value
  for (i=0; i < trackerArray.length; i++){
    if (i === (trackerArray.length - 1)){
      const newCell = newRow.insertCell();
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "X";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener('click', removeExpense);
      newCell.appendChild(removeBtn);
    } else {
      const newCell = newRow.insertCell(); 
      const newText = document.createTextNode(trackerArray[i]);
      newCell.appendChild(newText);
    }
  }
}

// remove expense from table
function removeExpense(e){
  e.preventDefault();

  console.log(e.target.parentElement.parentElement);
  dataTable.removeChild(e.target.parentElement.parentElement);
}