function renderPublications() {

    const container = document.getElementById("publications-container");

    if (!container) {
        console.log("Publications container not found");
        return;
    }

    container.innerHTML = "";

    publicationsData.forEach(function (pub) {

        const card = document.createElement("div");
        card.style.cssText = "padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12); background:linear-gradient(to right, #ec4899, #9333ea); color:#fff; transition:transform 0.3s; cursor:default;";

        card.addEventListener("mouseover", function () { card.style.transform = "scale(1.05)"; });
        card.addEventListener("mouseout", function () { card.style.transform = "scale(1)"; });

        const title = document.createElement("h3");
        title.style.cssText = "font-size:16px; font-weight:700; margin-bottom:8px; line-height:1.4;";
        title.textContent = pub.title;

        const publisher = document.createElement("p");
        publisher.style.cssText = "font-size:13px;";
        publisher.textContent = "Publisher: " + pub.publisher;

        const year = document.createElement("p");
        year.style.cssText = "font-size:13px; font-weight:600; margin-top:4px;";
        year.textContent = "Year: " + pub.year;

        card.appendChild(title);
        card.appendChild(publisher);
        card.appendChild(year);

        container.appendChild(card);

    });

    console.log("Publications rendered successfully");

}

