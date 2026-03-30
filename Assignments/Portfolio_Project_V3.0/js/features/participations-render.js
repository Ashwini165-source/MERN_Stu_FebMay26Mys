
function renderParticipations() {
    var elements = window.portfolioElements;
    if (!elements.participationsContainer || typeof participationsData === 'undefined' || !Array.isArray(participationsData)) return;

    elements.participationsContainer.innerHTML = "";

    participationsData.forEach(function (part) {
        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "scale");
        card.style.cssText = "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); background:linear-gradient(to right, #34d399, #14b8a6); color:#fff; transition:transform 0.3s; cursor:default;";

        var title = document.createElement("h3");
        title.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px;";
        title.textContent = part.title;

        var year = document.createElement("p");
        year.style.cssText = "font-size:13px; font-weight:600;";
        year.textContent = "Year: " + part.year;

        card.appendChild(title);
        card.appendChild(year);

        elements.participationsContainer.appendChild(card);
    });
}