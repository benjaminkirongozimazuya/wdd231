/**
 * Main Entry Point - JavaScript (ES Modules)
 */

import { fetchEateries, displayEateries } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Dynamic Year Management in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Responsive Navigation Menu (Burger Menu)
    const menuButton = document.getElementById('menu-button');
    const menuList = document.getElementById('menu-list');

    if (menuButton && menuList) {
        menuButton.addEventListener('click', () => {
            menuList.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }

    // 3. Load and display directory data if container is present on the page
    const eateryContainer = document.getElementById('eatery-container');
    if (eateryContainer) {
        const eateries = await fetchEateries();
        displayEateries(eateries, eateryContainer);
    }

    // 4. "Chef's Special" Loading Example on Home Page with Video support for Le Gourmet Kolwezien
    const chefSpecialCard = document.getElementById('chef-special-card');
    if (chefSpecialCard) {
        const eateries = await fetchEateries();
        if (eateries.length > 0) {
            const special = eateries[0]; // First item or special selection
            
            // Check if it's Le Gourmet Kolwezien to include a video preview with sound enabled and a smaller size
            let mediaContent = `<img src="${special.image}" alt="${special.name}" loading="lazy" width="300" height="200">`;
            if (special.name === "Le Gourmet Kolwezien") {
                mediaContent = `
                    <video controls loop playsinline style="width: 100%; max-width: 300px; height: auto; border-radius: 8px; margin-bottom: 1rem; display: block; margin-left: auto; margin-right: auto;">
                        <source src="images/gourmet-special.mp4" type="video/mp4">
                        Your browser does not support video playback.
                    </video>
                `;
            }

            chefSpecialCard.innerHTML = `
                ${mediaContent}
                <div class="card-content">
                    <h3>${special.name} - Special Dish</h3>
                    <p><strong>Cuisine:</strong> ${special.cuisine}</p>
                    <p><strong>Price:</strong> ${special.price}</p>
                    <p>Discover this exceptional dish specially prepared for you today!</p>
                </div>
            `;
        }
    }

    // 5. Load and display favorite eateries on the favorites page
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
});

// 6. Modal logic for contact / partnership page
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('partnership-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const learnMoreButtons = document.querySelectorAll('.info-btn');

    // Detailed descriptions for each partnership level
    const partnershipDetails = {
        "NP Partnership": "Designed for non-profit organizations with no partnership fee. Enjoy free listing on QuickBite Express and support local community initiatives.",
        "Bronze Partnership": "Basic networking and community event access. Perfect for small local eateries starting their digital journey.",
        "Silver Partnership": "Enhanced benefits and training discounts. Gain priority placement in local search results and promotional support.",
        "Gold Partnership": "Maximum visibility, spotlight positions, and VIP perks. Feature at the top of our directory and get a dedicated 'Chef's Special' highlight each month."
    };

    // Listen for clicks on each "Learn More" button
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.info-card');
            const title = card.querySelector('h3').textContent;
            const description = partnershipDetails[title] || "Detailed information coming soon.";

            // Inject content into the modal
            modalBody.innerHTML = `
                <h3>${title}</h3>
                <p style="margin-top: 1rem; line-height: 1.6;">${description}</p>
            `;

            // Open the modal
            if (modal && typeof modal.showModal === 'function') {
                modal.showModal();
            }
        });
    });

    // Close modal with the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    // Close modal when clicking outside of it (backdrop)
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