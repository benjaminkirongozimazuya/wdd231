const API_URL = '/api/equipements';

// Charger et afficher les données depuis l'API Flask/MySQL
async function fetchEquipements() {
  const response = await fetch(API_URL);
  const data = await response.json();
  
  const tbody = document.getElementById('equipements-list');
  
  let rowsHtml = '';
  data.forEach(item => {
    rowsHtml += `<tr>
      <td>${item.id}</td>
      <td>${item.nom}</td>
      <td>${item.quantite}</td>
      <td>${item.categorie}</td>
    </tr>`;
  });

  tbody.innerHTML = rowsHtml;
}

// Soumission du formulaire (POST)
document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nom = document.getElementById('nom').value;
  const quantite = document.getElementById('quantite').value;
  const categorie = document.getElementById('categorie').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom, quantite, categorie })
  });

  document.getElementById('add-form').reset();
  fetchEquipements();
});

// Chargement initial au démarrage
fetchEquipements();