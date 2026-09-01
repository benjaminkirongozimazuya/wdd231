// Toggle Navigation Menu
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Fetch Members Data
const url = "data/members.json";
const cardsContainer = document.querySelector("#cards");

async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

getMembersData();

const displayMembers = (members) => {
    cardsContainer.innerHTML = "";
    members.forEach((member, index) => {
        let card = document.createElement("div");
        card.classList.add("member-card");

        // Optimisation LCP : charge la première image immédiatement (eager), les autres en différé (lazy)
        const imageLoading = index === 0 ? "eager" : "lazy";

        // Dans la fonction displayMembers, remplacez <h3> par <h2>
        card.innerHTML = `
            <div class="card-header">
               <h2>${member.name}</h2>
               <span>${member.tagline}</span>
            </div>
            <div class="card-body">
                <img src="images/${member.image}" alt="${member.name}" loading="${imageLoading}">
                <div class="card-details">
                    <p><strong>EMAIL:</strong> ${member.email}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> ${member.website}</p>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
};

// Grid and List View Toggles
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
    cardsContainer.classList.add("grid");
    cardsContainer.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    cardsContainer.classList.add("list");
    cardsContainer.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// Footer Dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Toggle Dark Mode
const modeButton = document.querySelector('#dark-mode');
const body = document.querySelector('body');

modeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});