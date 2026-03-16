function renderCertifications(){
    
    const container = document.getElementById("certifications-container");

    if(!container){
        console.log("Certifications container not found");
        return;
    }

    container.innerHTML = "";

    certificationsData.forEach(function(cert){

        const card = document.createElement("div");

        card.className =
        "p-6 rounded-2xl shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 transition duration-300";

        const title = document.createElement("h3");
        title.className = "text-xl font-bold mb-2";
        title.textContent = cert.title;

        const issuer = document.createElement("p");
        issuer.className = "text-sm";
        issuer.textContent = "Issuer: " + cert.issuer;

        const year = document.createElement("p");
        year.className = "text-sm font-semibold mt-1";
        year.textContent = "Year: " + cert.year;

        card.appendChild(title);
        card.appendChild(issuer);
        card.appendChild(year);

        container.appendChild(card);

    });

    console.log("Certifications rendered successfully");

}