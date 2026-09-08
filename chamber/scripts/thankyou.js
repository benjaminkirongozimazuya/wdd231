document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultsContainer = document.getElementById("results");

    const fname = urlParams.get("fname");
    const lname = urlParams.get("lname");
    const email = urlParams.get("email");
    const phone = urlParams.get("phone");
    const business = urlParams.get("business");
    const timestamp = urlParams.get("timestamp");

    // Formater la date du timestamp de manière lisible
    let formattedDate = "Non spécifiée";
    if (timestamp) {
        const dateObj = new Date(timestamp);
        if (!isNaN(dateObj)) {
            formattedDate = dateObj.toLocaleString("fr-FR");
        } else {
            formattedDate = timestamp;
        }
    }

    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <ul>
                <li><strong>Prénom :</strong> ${fname || "Non renseigné"}</li>
                <li><strong>Nom :</strong> ${lname || "Non renseigné"}</li>
                <li><strong>Adresse e-mail :</strong> ${email || "Non renseigné"}</li>
                <li><strong>Téléphone mobile :</strong> ${phone || "Non renseigné"}</li>
                <li><strong>Nom de l'entreprise :</strong> ${business || "Non renseigné"}</li>
                <li><strong>Date et heure de soumission :</strong> ${formattedDate}</li>
            </ul>
        `;
    }
});