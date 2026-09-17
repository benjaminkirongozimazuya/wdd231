import { places } from "./places.mjs";

// 1. Dynamic generation of the 8 cards and modal management
const container = document.querySelector(".discover-grid");

function displayPlaces() {
    if (!container) return;
    container.innerHTML = "";
    
    places.forEach(place => {
        const card = document.createElement("section");
        card.classList.add("card");
        
        card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
        <img src="images/${place.photo}" alt="${place.name}" width="300" height="160" loading="eager">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-more-btn">Learn More</button>
    
    <dialog class="place-modal">
        <h3>${place.name}</h3>
        <p><strong>Address:</strong> ${place.address}</p>
        <p>${place.details || place.description}</p>
        <button class="close-modal">Close</button>
    </dialog>
`;
        
        container.appendChild(card);

        // Selecting elements internal to this specific card
        const btn = card.querySelector(".learn-more-btn");
        const modal = card.querySelector(".place-modal");
        const closeBtn = card.querySelector(".close-modal");

        // Open the modal on clicking "Learn More"
        btn.addEventListener("click", () => {
            modal.showModal();
        });

        // Close the modal on clicking the "Close" button
        closeBtn.addEventListener("click", () => {
            modal.close();
        });

        // Close the modal if clicking outside of it (on the backdrop)
        modal.addEventListener("click", (event) => {
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
    });
}

displayPlaces();

// 2. LocalStorage management for the visit message
const visitMessageElement = document.querySelector("#visit-message");

if (visitMessageElement) {
    const lastVisit = localStorage.getItem("lastVisit-ls");
    const currentDate = Date.now();
    
    if (!lastVisit) {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentDate - Number(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessageElement.textContent = "You last visited 1 day ago.";
        } else {
            visitMessageElement.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }
    
    localStorage.setItem("lastVisit-ls", currentDate);
}

// 3. Dark Mode management
const darkModeButton = document.querySelector("#dark-mode");

if (darkModeButton) {
    darkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

// 4. Responsive Burger Menu management
const hamButton = document.querySelector("#menu");
const mainNav = document.querySelector("nav");

if (hamButton && mainNav) {
    hamButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        hamButton.classList.toggle("open");
    });
}

// 5. Footer (Current Year & Last Modification Date)
const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.getElementById("lastModified");
if (lastModifiedParagraph) {
    const lastMod = new Date(document.lastModified);
    lastModifiedParagraph.textContent = `Last Modification: ${lastMod.toLocaleString("en-US")}`;
}