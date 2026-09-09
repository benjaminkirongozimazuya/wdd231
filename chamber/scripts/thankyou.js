document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultsContainer = document.getElementById("results");

    const fname = urlParams.get("fname");
    const lname = urlParams.get("lname");
    const email = urlParams.get("email");
    const phone = urlParams.get("phone");
    const business = urlParams.get("business");
    const timestamp = urlParams.get("timestamp");

    let formattedDate = "Not specified";
    if (timestamp) {
        const dateObj = new Date(timestamp);
        if (!isNaN(dateObj)) {
            formattedDate = dateObj.toLocaleString("en-US");
        } else {
            formattedDate = timestamp;
        }
    }

    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <ul>
                <li><strong>First Name:</strong> ${fname || "Not provided"}</li>
                <li><strong>Last Name:</strong> ${lname || "Not provided"}</li>
                <li><strong>Email Address:</strong> ${email || "Not provided"}</li>
                <li><strong>Mobile Phone:</strong> ${phone || "Not provided"}</li>
                <li><strong>Business Name:</strong> ${business || "Not provided"}</li>
                <li><strong>Submission Date & Time:</strong> ${formattedDate}</li>
            </ul>
        `;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const darkModeButton = document.querySelector("#dark-mode");
    const body = document.body;

    // Vérifier si le bouton existe sur la page
    if (darkModeButton) {
        darkModeButton.addEventListener("click", () => {
            body.classList.toggle("dark-mode"); // Bascule la classe sombre sur le body
            
            // Optionnel : Changer l'icône selon le mode
            if (body.classList.contains("dark-mode")) {
                darkModeButton.textContent = "☀️";
            } else {
                darkModeButton.textContent = "🌓";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Afficher l'année en cours dans le footer
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Afficher la date de dernière modification du document
    const lastModifiedParagraph = document.getElementById("lastModified");
    if (lastModifiedParagraph) {
        // Récupère la date de modification du fichier et la formate
        const lastMod = new Date(document.lastModified);
        lastModifiedParagraph.textContent = `Last Modification: ${lastMod.toLocaleString("en-US")}`;
    }
}); 

// 3. Gestion des modaux (Ajouté en bas)
document.addEventListener("DOMContentLoaded", () => {
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });
});