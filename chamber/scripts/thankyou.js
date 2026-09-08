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