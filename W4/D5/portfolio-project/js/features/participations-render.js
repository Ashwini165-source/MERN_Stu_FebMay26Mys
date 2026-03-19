function renderParticipations() {

    const container = document.getElementById("participations-container");

    if (!container) {
        console.log("Participations container not found");
        return;
    }

    container.innerHTML = "";

    participationsData.forEach(function (part) {

        const card = document.createElement("div");
        card.style.cssText = "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); background:linear-gradient(to right, #34d399, #14b8a6); color:#fff; transition:transform 0.3s; cursor:default;";

        card.addEventListener("mouseover", function () { card.style.transform = "scale(1.05)"; });
        card.addEventListener("mouseout", function () { card.style.transform = "scale(1)"; });

        const title = document.createElement("h3");
        title.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px;";
        title.textContent = part.title;

        const year = document.createElement("p");
        year.style.cssText = "font-size:13px; font-weight:600;";
        year.textContent = "Year: " + part.year;

        card.appendChild(title);
        card.appendChild(year);

        container.appendChild(card);
    });

    console.log("Participations rendered successfully");
}
