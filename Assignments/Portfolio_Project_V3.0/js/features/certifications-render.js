function renderCertifications() {
    var elements = window.portfolioElements;
    if (!elements.certificationsContainer || typeof certificationsData === 'undefined' || !Array.isArray(certificationsData)) return;

    elements.certificationsContainer.innerHTML = "";

    certificationsData.forEach(function (cert) {
        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "scale");
        card.style.cssText = "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); background:linear-gradient(to right, #3b82f6, #6366f1); color:#fff; transition:transform 0.3s; cursor:default;";

        var title = document.createElement("h3");
        title.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px;";
        title.textContent = cert.title;

        var issuer = document.createElement("p");
        issuer.style.cssText = "font-size:13px;";
        issuer.textContent = "Issuer: " + cert.issuer;

        var year = document.createElement("p");
        year.style.cssText = "font-size:13px; font-weight:600; margin-top:4px;";
        year.textContent = "Year: " + cert.year;

        card.appendChild(title);
        card.appendChild(issuer);
        card.appendChild(year);

        elements.certificationsContainer.appendChild(card);
    });
}