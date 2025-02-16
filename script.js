const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const dashboard = document.getElementById('dashboard');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // Simulate login check
  if (email === 'caissier@nedjm.com' && password === 'password123') {
    loginContainer.style.display = 'none';
    dashboard.style.display = 'block';
  } else {
    alert('Invalid credentials');
  }
});

const saveButton = document.getElementById('save-button');
const dataTableBody = document.getElementById('data-table-body');
let operationNumber = 1;

const npcCell = document.getElementById('npcCell');
const npcSelect = document.getElementById('npc');

function createNpcInput(type) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Entrer N° de ${type}`;
    input.id = `n${type}`;
    input.classList.add('dynamic-input'); //for styling
    return input;
}

npcSelect.addEventListener('change', () => {
    const selectedType = npcSelect.value;
    npcCell.innerHTML = ''; // Clear the cell

    if (selectedType === 'VIREMENT' || selectedType === 'CHEQUE') {
        const input = createNpcInput(selectedType);
        npcCell.appendChild(input);
    } else {
        npcCell.appendChild(npcSelect); // Re-add the select if no option is chosen
    }
});

saveButton.addEventListener('click', () => {
  const dateNpc = document.getElementById('dateNpc').value;
  const dateRelev = document.getElementById('dateRelev').value;
  let npc = '';
  const nProforma = document.getElementById('nProforma').value;
  const nFacture = document.getElementById('nFacture').value;
  const libelle = document.getElementById('libelle').value;
  const debit = document.getElementById('debit').value;
  const credit = document.getElementById('credit').value;
  const frBan = document.getElementById('frBan').value;

    // Get NPC value (either from select or input)
    if (npcCell.firstChild.tagName === 'SELECT') {
        npc = npcSelect.options[npcSelect.selectedIndex].text;
    } else {
        npc = `${npcSelect.options[npcSelect.selectedIndex].text} ${npcCell.firstChild.value}`;
    }

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${operationNumber++}</td>
    <td>${dateNpc}</td>
    <td>${dateRelev}</td>
    <td>${npc}</td>
    <td>${nProforma}</td>
    <td>${nFacture}</td>
    <td>${libelle}</td>
    <td>${debit}</td>
    <td>${credit}</td>
    <td>${frBan}</td>
    <td><button>Modifier</button></td>
  `;
  dataTableBody.appendChild(newRow);

    // Clear input fields after saving
  document.getElementById('dateNpc').value = '';
  document.getElementById('dateRelev').value = '';
  npcSelect.value = '';
  document.getElementById('nProforma').value = '';
  document.getElementById('nFacture').value = '';
  document.getElementById('libelle').value = '';
  document.getElementById('debit').value = '';
  document.getElementById('credit').value = '';
  document.getElementById('frBan').value = '';

    // Reset NPC cell to select
  npcCell.innerHTML = '';
  npcCell.appendChild(npcSelect);

});
