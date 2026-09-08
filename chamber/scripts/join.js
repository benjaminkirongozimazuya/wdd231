document.addEventListener("DOMContentLoaded", () => {
    // 1. Remplir automatiquement le champ timestamp caché
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Gestion du menu Hamburger mobile
    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            menuButton.classList.toggle("open");
        });
    }

    // 3. Gestion des modaux (Ouverture / Fermeture)
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

    // 4. Gestion du Mode Sombre (Dark Mode)
    const darkModeButton = document.querySelector("#dark-mode");
    const body = document.body;

    if (darkModeButton) {
        darkModeButton.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            
            if (body.classList.contains("dark-mode")) {
                darkModeButton.textContent = "☀️";
            } else {
                darkModeButton.textContent = "🌓";
            }
        });
    }

    // 5. Pied de page (Année en cours & Date de dernière modification)
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById("lastModified");
    if (lastModifiedParagraph) {
        const lastMod = new Date(document.lastModified);
        lastModifiedParagraph.textContent = `Last Modification: ${lastMod.toLocaleString("en-US")}`;
    }
});