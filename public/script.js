const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const dashboard = document.getElementById('dashboard');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      loginContainer.style.display = 'none';
      dashboard.style.display = 'block';
      loadData(); // Load initial data after successful login
    } else {
      alert(data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again later.');
  }
});

const saveButton = document.getElementById('save-button');
const dataTableBody = document.getElementById('data-table-body');

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

async function loadData() {
  try {
    const response = await fetch('/api/data');
    const { data } = await response.json();
    renderData(data);
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function renderData(data) {
  dataTableBody.innerHTML = ''; // Clear existing rows
  data.forEach(item => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${item.operationNumber}</td>
      <td>${item.dateNpc}</td>
      <td>${item.dateRelev}</td>
      <td>${item.npc}</td>
      <td>${item.nProforma}</td>
      <td>${item.nFacture}</td>
      <td>${item.libelle}</td>
      <td>${item.debit}</td>
      <td>${item.credit}</td>
      <td>${item.frBan}</td>
      <td><button>Modifier</button></td>
    `;
    dataTableBody.appendChild(newRow);
  });
}

saveButton.addEventListener('click', async () => {
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

    const newData = {
      dateNpc,
      dateRelev,
      npc,
      nProforma,
      nFacture,
      libelle,
      debit,
      credit,
      frBan
    };

  try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });

      const result = await response.json();

      if(result.success) {
          renderData([result.data]); // Add to the table
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
          loadData(); // Reload all data to ensure correct operation numbers
      } else {
        alert('Failed to save data.');
      }

  } catch(err) {
      console.error("Error saving data:", err);
      alert("Error saving data");
  }
});

// Initial data load (if needed, e.g., on page refresh)
if (dashboard.style.display !== 'none') {
  loadData();
}
