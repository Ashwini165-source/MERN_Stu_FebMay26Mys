
function renderPublications() {
    var elements = window.portfolioElements;
    if (!elements.publicationsContainer || typeof publicationsData === 'undefined' || !Array.isArray(publicationsData)) return;

    elements.publicationsContainer.innerHTML = "";

    publicationsData.forEach(function (pub) {

        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "scale");
        card.style.cssText = "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); background:linear-gradient(to right, #ec4899, #9333ea); color:#fff; transition:transform 0.3s; cursor:default;";

        var title = document.createElement("h3");
        title.style.cssText = "font-size:16px; font-weight:700; margin-bottom:8px; line-height:1.4;";
        title.textContent = pub.title;

        var publisher = document.createElement("p");
        publisher.style.cssText = "font-size:13px;";
        publisher.textContent = "Publisher: " + pub.publisher;

        var year = document.createElement("p");
        year.style.cssText = "font-size:13px; font-weight:600; margin-top:4px;";
        year.textContent = "Year: " + pub.year;

        card.appendChild(title);
        card.appendChild(publisher);
        card.appendChild(year);

        elements.publicationsContainer.appendChild(card);
    });
}