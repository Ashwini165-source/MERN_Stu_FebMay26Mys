function renderCertifications() {

    const container = document.getElementById("certifications-container");

    if (!container) {
        console.log("Certifications container not found");
        return;
    }

    container.innerHTML = "";

    certificationsData.forEach(function (cert) {

        const card = document.createElement("div");
        card.style.cssText = "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); background:linear-gradient(to right, #3b82f6, #6366f1); color:#fff; transition:transform 0.3s; cursor:default;";

        card.addEventListener("mouseover", function () { card.style.transform = "scale(1.05)"; });
        card.addEventListener("mouseout", function () { card.style.transform = "scale(1)"; });

        const title = document.createElement("h3");
        title.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px;";
        title.textContent = cert.title;

        const issuer = document.createElement("p");
        issuer.style.cssText = "font-size:13px;";
        issuer.textContent = "Issuer: " + cert.issuer;

        const year = document.createElement("p");
        year.style.cssText = "font-size:13px; font-weight:600; margin-top:4px;";
        year.textContent = "Year: " + cert.year;

        card.appendChild(title);
        card.appendChild(issuer);
        card.appendChild(year);

        container.appendChild(card);

    });

    console.log("Certifications rendered successfully");
    
}
