function renderParticipations(){

    const container = document.getElementById("participations-container");

    if(!container){
        console.log("Participations container not found");
        return;
    }

    container.innerHTML = "";

    participationsData.forEach(function(part){

        const card = document.createElement("div");

        card.className =
        "p-6 rounded-2xl shadow-xl bg-gradient-to-r from-green-400 to-teal-500 text-white hover:scale-105 transition duration-300";

        const title = document.createElement("h3");
        title.className = "text-xl font-bold mb-2";
        title.textContent = part.title;

        const year = document.createElement("p");
        year.className = "text-sm font-semibold";
        year.textContent = "Year: " + part.year;

        card.appendChild(title);
        card.appendChild(year);

        container.appendChild(card);

    });

    console.log("Participations rendered successfully");

}
