function projectSearch(){
    
    const projectContainer = document.getElementById("projects-container");

    if(!projectContainer){
        console.log("Project Container not found");
        return;
    }

    projectContainer.innerHTML = "";
    projectsData.forEach(function(project){
        //to create outer card
        const card = document.createElement("div");
        card.className = "p-8 text-center bg-white rounded-3xl shadow-lg";

        //create icon
        const iconBox = document.createElement("div");
        iconBox.className = "w-20 h-20 mx-auto mb-4 bg-green-900 rounded-2xl flex item-center justify-center";

        //create icon text
        const iconText = document.createElement("span");
        iconText.className = "text-2xl text-white font-bold";
        iconText.textContent = project.shortLabel;

        //put icon text inside icon box
        iconBox.appendChild(iconText);

        //create project name
        const projectName = document.createElement("h3");
        projectName.className = "text-xl font-bold mb-2";
        projectName.textContent = project.name;

        //create project description
        const projectDescription = document.createElement("p");
        projectDescription.className = "text-sm";
        projectDescription.textContent = project.description;
       //Append all child elements to card
        card.appendChild(iconBox);
        card.appendChild(projectName);
        card.appendChild(projectDescription);
        //Append card to project container
        projectContainer.appendChild(card);
    });
    console.log("Projects rendered successfully");
}