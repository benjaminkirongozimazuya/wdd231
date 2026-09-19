/**
 * Module de gestion du Local Storage pour les favoris
 */

const FAVORITES_KEY = 'quickbite_favorites';

/**
 * Récupère la liste des IDs favoris depuis le localStorage
 */
export function getFavorites() {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Erreur lors de la lecture du Local Storage :", error);
        return [];
    }
}

/**
 * Ajoute ou retire un ID des favoris dans le localStorage
 */
export function toggleFavorite(id) {
    try {
        let favorites = getFavorites();
        const numericId = Number(id);

        if (favorites.includes(numericId)) {
            // Retirer des favoris
            favorites = favorites.filter(favId => favId !== numericId);
        } else {
            // Ajouter aux favoris
            favorites.push(numericId);
        }

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return favorites;
    } catch (error) {
        console.error("Erreur lors de la modification du Local Storage :", error);
        return getFavorites();
    }
}