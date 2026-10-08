const API_URL = '/api/equipements';

// Charger et afficher les données depuis l'API Flask/MySQL
async function fetchEquipements() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    
    const data = await response.json();
    const tbody = document.getElementById('equipements-list');
    tbody.innerHTML = '';
    
    data.forEach(item => {
      const tr = document.createElement('tr');
      
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nom}</td>
        <td>${item.quantite}</td>
        <td>${item.categorie}</td>
        <td>
          <button class="btn-edit" style="background-color: #ff9800; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; margin-right: 5px;">
            Modifier
          </button>
          <button class="btn-delete" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">
            Supprimer
          </button>
        </td>
      `;

      // Attacher les événements aux boutons créés
      tr.querySelector('.btn-edit').addEventListener('click', () => editEquipement(item));
      tr.querySelector('.btn-delete').addEventListener('click', () => deleteEquipement(item.id));

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des équipements :', error);
  }
}

// Soumission du formulaire d'ajout (POST)
const addForm = document.getElementById('add-form');
if (addForm) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const quantite = document.getElementById('quantite').value;
    const categorie = document.getElementById('categorie').value;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, quantite: parseInt(quantite), categorie })
      });

      if (res.ok) {
        addForm.reset();
        await fetchEquipements(); // Attendre la fin du rechargement
      } else {
        alert("Erreur lors de l'ajout de l'équipement.");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout :', error);
    }
  });
}

// Supprimer un équipement (DELETE)
async function deleteEquipement(id) {
  if (confirm("Voulez-vous vraiment supprimer cet équipement ?")) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        await fetchEquipements(); // Attendre impérativement la confirmation du serveur
      } else {
        alert("Impossible de supprimer l'élément (Erreur serveur)");
      }
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }
}

// Modifier un équipement (PUT)
async function editEquipement(item) {
  const nouveauNom = prompt("Nouveau nom :", item.nom);
  const nouvelleQuantite = prompt("Nouvelle quantité :", item.quantite);
  const nouvelleCategorie = prompt("Nouvelle catégorie :", item.categorie);

  if (nouveauNom !== null && nouvelleQuantite !== null && nouvelleCategorie !== null) {
    try {
      const res = await fetch(`${API_URL}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: nouveauNom,
          quantite: parseInt(nouvelleQuantite),
          categorie: nouvelleCategorie
        })
      });

      if (res.ok) {
        await fetchEquipements(); // Attendre impérativement la mise à jour
      } else {
        alert("Impossible de modifier l'élément (Erreur serveur)");
      }
    } catch (error) {
      console.error('Erreur lors de la modification :', error);
    }
  }
}

// Chargement initial au démarrage
fetchEquipements();