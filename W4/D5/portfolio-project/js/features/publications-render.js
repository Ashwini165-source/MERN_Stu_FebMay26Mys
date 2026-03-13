function renderPublications(){

    const container = document.getElementById("publications-container");

    if(!container){
        console.log("Publications container not found");
        return;
    }

    container.innerHTML = "";

    publicationsData.forEach(function(pub){

        const card = document.createElement("div");

        card.className =
        "p-6 rounded-2xl shadow-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 transition duration-300";

        const title = document.createElement("h3");
        title.className = "text-lg font-bold mb-2";
        title.textContent = pub.title;

        const publisher = document.createElement("p");
        publisher.className = "text-sm";
        publisher.textContent = "Publisher: " + pub.publisher;

        const year = document.createElement("p");
        year.className = "text-sm font-semibold mt-1";
        year.textContent = "Year: " + pub.year;

        card.appendChild(title);
        card.appendChild(publisher);
        card.appendChild(year);

        container.appendChild(card);

    });

    console.log("Publications rendered successfully");

}