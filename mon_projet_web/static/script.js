const API_URL = '/api/equipements';

// Charger et afficher les données depuis l'API Flask/MySQL
async function fetchEquipements() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    const tbody = document.getElementById('equipements-list');
    
    let rowsHtml = '';
    data.forEach(item => {
      // Échappement des guillemets pour éviter les erreurs de syntaxe dans prompt()
      const nomEschape = item.nom.replace(/'/g, "\\'");
      const categorieEschape = item.categorie.replace(/'/g, "\\'");

      rowsHtml += `<tr>
        <td>${item.id}</td>
        <td>${item.nom}</td>
        <td>${item.quantite}</td>
        <td>${item.categorie}</td>
        <td>
          <button style="background-color: #ff9800; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; margin-right: 5px;" 
                  onclick="editEquipement(${item.id}, '${nomEschape}', ${item.quantite}, '${categorieEschape}')">
            Modifier
          </button>
          <button style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;" 
                  onclick="deleteEquipement(${item.id})">
            Supprimer
          </button>
        </td>
      </tr>`;
    });

    tbody.innerHTML = rowsHtml;
  } catch (error) {
    console.error('Erreur lors du chargement des équipements :', error);
  }
}

// Soumission du formulaire d'ajout (POST)
document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nom = document.getElementById('nom').value;
  const quantite = document.getElementById('quantite').value;
  const categorie = document.getElementById('categorie').value;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, quantite: parseInt(quantite), categorie })
    });

    document.getElementById('add-form').reset();
    fetchEquipements();
  } catch (error) {
    console.error('Erreur lors de l\'ajout :', error);
  }
});

// Supprimer un équipement (DELETE)
async function deleteEquipement(id) {
  if (confirm("Voulez-vous vraiment supprimer cet équipement ?")) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      fetchEquipements();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }
}

// Modifier un équipement (PUT)
async function editEquipement(id, nomActuel, quantiteActuelle, categorieActuelle) {
  const nouveauNom = prompt("Nouveau nom :", nomActuel);
  const nouvelleQuantite = prompt("Nouvelle quantité :", quantiteActuelle);
  const nouvelleCategorie = prompt("Nouvelle catégorie :", categorieActuelle);

  if (nouveauNom && nouvelleQuantite && nouvelleCategorie) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: nouveauNom,
          quantite: parseInt(nouvelleQuantite),
          categorie: nouvelleCategorie
        })
      });
      fetchEquipements();
    } catch (error) {
      console.error('Erreur lors de la modification :', error);
    }
  }
}

// Chargement initial au démarrage
fetchEquipements();