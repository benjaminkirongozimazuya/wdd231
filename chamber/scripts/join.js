document.addEventListener("DOMContentLoaded", () => {
    // 1. Remplir automatiquement le champ timestamp caché
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Gestion des modaux (Ouverture / Fermeture)
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