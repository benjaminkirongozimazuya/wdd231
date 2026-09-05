// --- 1. TOGGLE NAVIGATION MENU ---
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// --- 2. FOOTER DATES ---
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// --- 3. TOGGLE DARK MODE ---
const modeButton = document.querySelector('#dark-mode');
const body = document.querySelector('body');

modeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// --- 4. OPENWEATHERMAP API INTEGRATION ---
const apiKey = "245e0b9749af7d6053b410eea9f5d10c";
const lat = -10.7148;
const lon = 25.4667;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            console.error("Erreur météo actuelle :", await response.text());
        }
    } catch (error) {
        console.error("Fetch error (weather):", error);
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

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            console.error("Erreur prévisions :", await response.text());
        }
    } catch (error) {
        console.error("Fetch error (forecast):", error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast-container');
    forecastContainer.innerHTML = ''; 

    const threeDayForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        const temp = Math.round(day.main.temp);

        const forecastItem = document.createElement('p');
        forecastItem.innerHTML = `<strong>${dayName}:</strong> ${temp}&deg;C`;
        forecastContainer.appendChild(forecastItem);
    });
}

fetchCurrentWeather();
fetchForecast();

// --- 5. MEMBER SPOTLIGHTS ---
const membersUrl = "data/members.json"; 
const spotlightsContainer = document.querySelector("#spotlights");

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        } else {
            console.error("Erreur chargement JSON members");
        }
    } catch (error) {
        console.error("Fetch error (spotlights):", error);
    }
}

function displaySpotlights(members) {
    // Filtrer les membres de niveau 2 (Silver) ou 3 (Gold)
    const filteredMembers = members.filter(member => member.membership >= 2);
    
    // Mélanger aléatoirement et en prendre 3 max
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
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
            <p><strong>EMAIL:</strong> ${member.email}</p>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="https://${member.website}" target="_blank">${member.website}</a></p>
            <span class="badge ${member.membership === 3 ? 'gold' : 'silver'}">${levelText}</span>
        `;
        spotlightsContainer.appendChild(card);
    });
}

getSpotlights();