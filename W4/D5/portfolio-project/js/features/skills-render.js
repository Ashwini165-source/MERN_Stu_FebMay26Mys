function renderSkills() {

    const skillsContainer = document.getElementById("skills-container");

    if (!skillsContainer) {
        console.log("Skills Container not found");
        return;
    }

    skillsContainer.innerHTML = "";

    skillsData.forEach(function (skill) {

        // Outer card
        const card = document.createElement("div");
        card.style.cssText = "padding:32px; text-align:center; background:#fff; border-radius:24px; box-shadow:0 4px 16px rgba(0,0,0,0.08); transition:box-shadow 0.3s, transform 0.3s; cursor:default;";

        card.addEventListener("mouseover", function () {
            card.style.boxShadow = "0 8px 30px rgba(0,0,0,0.14)";
            card.style.transform = "translateY(-4px)";
        });
        card.addEventListener("mouseout", function () {
            card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            card.style.transform = "translateY(0)";
        });

        // Icon box
        const iconBox = document.createElement("div");
        iconBox.style.cssText = "width:80px; height:80px; margin:0 auto 16px auto; background:#14532d; border-radius:16px; display:flex; align-items:center; justify-content:center;";

        // Icon text (shortLabel)
        const iconText = document.createElement("span");
        iconText.style.cssText = "font-size:24px; color:#fff; font-weight:700;";
        iconText.textContent = skill.shortLabel;

        iconBox.appendChild(iconText);

        // Skill name
        const skillName = document.createElement("h3");
        skillName.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px; color:#1f2937;";
        skillName.textContent = skill.name;

        // Skill description
        const skillDescription = document.createElement("p");
        skillDescription.style.cssText = "font-size:13px; color:#6b7280; line-height:1.5;";
        skillDescription.textContent = skill.description;

        card.appendChild(iconBox);
        card.appendChild(skillName);
        card.appendChild(skillDescription);

        skillsContainer.appendChild(card);
    });

    console.log("Skills rendered successfully");
}