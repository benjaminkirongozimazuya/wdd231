import { places } from "./data/places.mjs";

const container = document.querySelector(".discover-grid"); // Assure-toi d'avoir un conteneur avec cette classe

function displayPlaces() {
    container.innerHTML = "";
    places.place.forEach(place => { // ou places directement selon ton export
        // Code pour créer les cartes dynamiquement avec h2, figure, address, p, button
    });
}