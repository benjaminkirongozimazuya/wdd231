// Toggle Navigation Menu
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
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

// OpenWeatherMap API Integration (Kolwezi Coordinates: Lat -10.7148, Lon 25.4667)
const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Remplacez par votre clé API OpenWeatherMap
const lat = -10.7148;
const lon = 25.4667;
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function displayCurrentWeather(data) {
    const tempElement = document.querySelector('#current-temp');
    const descElement = document.querySelector('#weather-desc');
    const iconElement = document.querySelector('#weather-icon');

    tempElement.textContent = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    descElement.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    
    const iconsCode = data.weather[0].icon;
    iconElement.setAttribute('src', `https://openweathermap.org/img/wn/${iconsCode}@2x.png`);
    iconElement.setAttribute('alt', desc);
}

apiFetch();

// Fetch Member Spotlights (Gold = 3, Silver = 2)
const membersUrl = "data/members.json";
const spotlightsContainer = document.querySelector("#spotlights");

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displaySpotlights(data);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    // Filtrer uniquement les membres de niveau 2 (Silver) ou 3 (Gold)
    const filteredMembers = members.filter(member => member.membership >= 2);
    
    // Mélanger aléatoirement et en prendre 2 ou 3
    const shuffled = filteredMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    spotlightsContainer.innerHTML = "";
    selected.forEach(member => {
        let card = document.createElement("section");
        card.classList.add("spotlight-card");

        let levelText = member.membership === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline"><em>${member.tagline}</em></p>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <p><strong>EMAIL:</strong> ${member.email}</p>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="#" target="_blank">${member.website}</a></p>
            <span class="badge ${member.membership === 3 ? 'gold' : 'silver'}">${levelText}</span>
        `;
        spotlightsContainer.appendChild(card);
    });
}

getSpotlights();