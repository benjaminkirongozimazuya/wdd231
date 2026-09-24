/**
 * Main Entry Point - JavaScript (ES Modules)
 */

import { fetchEateries, displayEateries } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Gestion dynamique de l'année dans le pied de page
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menu de navigation responsive (Menu Burger)
const menuButton = document.getElementById('menu-button');
const menuList = document.getElementById('menu-list');

if (menuButton && menuList) {
    menuButton.addEventListener('click', () => {
        menuList.classList.toggle('open');
        menuButton.classList.toggle('open');
        
        // Change le symbole textuel du bouton au clic
        if (menuList.classList.contains('open')) {
            menuButton.innerHTML = '&#10005;'; // Code pour la croix (✕)
        } else {
            menuButton.innerHTML = '&#9776;'; // Code pour les barres (☰)
        }
    });
}

    // 3. Chargement et affichage des données du répertoire si le conteneur est présent
    const eateryContainer = document.getElementById('eatery-container');
    if (eateryContainer) {
        const eateries = await fetchEateries();
        displayEateries(eateries, eateryContainer);
    }

    // 4. Section "Chef's Special" avec support vidéo et photo de Kolwezi pour Le Gourmet Kolwezien
    const chefSpecialCard = document.getElementById('chef-special-card');
    if (chefSpecialCard) {
        const eateries = await fetchEateries();
        if (eateries.length > 0) {
            const special = eateries[0]; // Premier élément ou sélection spéciale
            
            let mediaContent = `<img src="${special.image}" alt="${special.name}" loading="lazy" width="300" height="200" class="special-img">`;
            
            // Si c'est Le Gourmet Kolwezien, on affiche la vidéo à gauche et la photo de Kolwezi à droite
            if (special.name === "Le Gourmet Kolwezien") {
                mediaContent = `
                    <div class="chef-special-grid">
                        <div class="media-item">
                            <video controls loop playsinline class="special-video">
                                <source src="images/gourmet-special.mp4" type="video/mp4">
                                Your browser does not support video playback.
                            </video>
                        </div>
                        <div class="media-item">
                            <img src="images/kolwezi-city.jpg" alt="Vue de la ville de Kolwezi" loading="lazy" width="300" height="200" class="special-img">
                        </div>
                    </div>
                `;
            }

            chefSpecialCard.innerHTML = `
                ${mediaContent}
                <div class="card-content">
                    <h3>${special.name} - Special Dish</h3>
                    <p><strong>Cuisine :</strong> ${special.cuisine}</p>
                    <p><strong>Prix :</strong> ${special.price}</p>
                    <p>Découvrez ce plat exceptionnel préparé avec passion au cœur de Kolwezi !</p>
                </div>
            `;
        }
    }

    // 5. Chargement et affichage des restaurants favoris
    const favoritesContainer = document.getElementById('favorites-container');
    if (favoritesContainer) {
        const eateries = await fetchEateries();
        const favoriteIds = JSON.parse(localStorage.getItem('quickbite_favorites')) || [];
        const favoriteEateries = eateries.filter(item => favoriteIds.includes(item.id));

        if (favoriteEateries.length > 0) {
            displayEateries(favoriteEateries, favoritesContainer);
        } else {
            favoritesContainer.innerHTML = `
                <p id="no-favorites-msg">No favorites saved yet. Browse our <a href="directory.html">directory</a> to add some!</p>
            `;
        }
    }

    // 6. Logique de la modale pour la page de contact / partenariat
    const modal = document.getElementById('partnership-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const learnMoreButtons = document.querySelectorAll('.info-btn');

    const partnershipDetails = {
        "NP Partnership": "Conçu pour les organisations à but non lucratif sans frais de partenariat. Profitez d'un référencement gratuit sur QuickBite Express.",
        "Bronze Partnership": "Accès de base au réseau et aux événements communautaires. Idéal pour les petits restaurants locaux.",
        "Silver Partnership": "Avantages améliorés et réductions sur les formations. Bénéficiez d'un meilleur positionnement dans les recherches.",
        "Gold Partnership": "Visibilité maximale, positions phares et avantages VIP. Figurez en haut du répertoire avec un coup de projecteur mensuel."
    };

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.info-card');
            const title = card.querySelector('h3').textContent;
            const description = partnershipDetails[title] || "Informations détaillées bientôt disponibles.";

            modalBody.innerHTML = `
                <h3>${title}</h3>
                <p style="margin-top: 1rem; line-height: 1.6;">${description}</p>
            `;

            if (modal && typeof modal.showModal === 'function') {
                modal.showModal();
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            const rect = modal.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                modal.close();
            }
        });
    }
});