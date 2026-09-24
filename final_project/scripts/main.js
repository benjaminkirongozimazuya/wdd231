/**
 * Main Entry Point - JavaScript (ES Modules)
 */

import { fetchEateries, displayEateries } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Dynamic year management in the footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Responsive navigation menu (Burger Menu)
    const menuButton = document.getElementById('menu-button');
    const menuList = document.getElementById('menu-list');

    if (menuButton && menuList) {
        menuButton.addEventListener('click', () => {
            menuList.classList.toggle('open');
            menuButton.classList.toggle('open');
            
            // Change the button text symbol on click
            if (menuList.classList.contains('open')) {
                menuButton.innerHTML = '&#10005;'; // Code for cross (✕)
            } else {
                menuButton.innerHTML = '&#9776;'; // Code for bars (☰)
            }
        });
    }

    // 3. Load and display directory data if the container is present
    const eateryContainer = document.getElementById('eatery-container');
    if (eateryContainer) {
        const eateries = await fetchEateries();
        displayEateries(eateries, eateryContainer);
    }

    // 4. "Chef's Special" section with video and Kolwezi photo support for Le Gourmet Kolwezien
    const chefSpecialCard = document.getElementById('chef-special-card');
    if (chefSpecialCard) {
        const eateries = await fetchEateries();
        if (eateries.length > 0) {
            const special = eateries[0]; // First item or special selection
            
            let mediaContent = `<img src="${special.image}" alt="${special.name}" loading="lazy" width="300" height="200" class="special-img">`;
            
            // If it's Le Gourmet Kolwezien, show the video on the left and the Kolwezi photo on the right
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
                            <img src="images/kolwezi-city.jpg" alt="View of Kolwezi city" loading="lazy" width="300" height="200" class="special-img">
                        </div>
                    </div>
                `;
            }

            chefSpecialCard.innerHTML = `
                ${mediaContent}
                <div class="card-content">
                    <h3>${special.name} - Special Dish</h3>
                    <p><strong>Cuisine :</strong> ${special.cuisine}</p>
                    <p><strong>Price :</strong> ${special.price}</p>
                    <p>Discover this exceptional dish prepared with passion in the heart of Kolwezi!</p>
                </div>
            `;
        }
    }

    // 5. Load and display favorite restaurants
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

    // 6. Modal logic for information / contact pages
    const modal = document.getElementById('partnership-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const learnMoreButtons = document.querySelectorAll('.info-btn');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.info-card');
            const title = card.querySelector('h3').textContent;

            modalBody.innerHTML = `
                <h3>${title}</h3>
                <p style="margin-top: 1rem; line-height: 1.6;">Detailed information coming soon.</p>
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