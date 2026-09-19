/**
 * Data Management Module (API & Fetch)
 */

export async function fetchEateries(url = 'data/eateries.json') {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch eateries data:", error);
        return [];
    }
}

/**
 * Displays a list of eateries in a given HTML container
 */
export function displayEateries(eateries, containerElement) {
    if (!containerElement) return;

    containerElement.innerHTML = ''; // Clear previous content

    // Retrieve current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('quickbite_favorites')) || [];

    // Use array methods and template literals
    eateries.forEach(item => {
        const isFavorite = favorites.includes(item.id);
        const btnText = isFavorite ? "Remove from Favorites 💔" : "Add to Favorites ❤️";
        const btnClass = isFavorite ? "favorite-btn active" : "favorite-btn";

        const card = document.createElement('div');
        card.classList.add('eatery-card');

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p><strong>Cuisine:</strong> ${item.cuisine}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Rating:</strong> ⭐ ${item.rating} / 5</p>
                <button class="${btnClass}" data-id="${item.id}">${btnText}</button>
            </div>
        `;

        containerElement.appendChild(card);
    });

    // Initialize favorite buttons interactivity
    initFavoriteButtons();
}

/**
 * Initializes favorite buttons click behavior and localStorage updates
 */
function initFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const eateryId = parseInt(event.target.getAttribute('data-id'));
            let favorites = JSON.parse(localStorage.getItem('quickbite_favorites')) || [];

            if (favorites.includes(eateryId)) {
                // Remove from favorites
                favorites = favorites.filter(id => id !== eateryId);
                event.target.textContent = "Add to Favorites ❤️";
                event.target.classList.remove('active');
            } else {
                // Add to favorites
                favorites.push(eateryId);
                event.target.textContent = "Remove from Favorites 💔";
                event.target.classList.add('active');
            }

            // Save updated list to localStorage
            localStorage.setItem('quickbite_favorites', JSON.stringify(favorites));
        });
    });
}