function renderSkills() {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    if (!elements.skillsContainer || !Array.isArray(state.skillsData)) return;

    // Update skill filter button active styles from state
    if (elements.skillFilterButtons) {
        elements.skillFilterButtons.forEach(function (b) {
            var isActive = b.getAttribute("data-category") === state.skillCategory;
            b.className = isActive
                ? "skill-filter-btn px-6 py-2 rounded-full border-2 border-blue-500 bg-blue-500 text-white font-bold transition-all"
                : "skill-filter-btn px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold transition-all";
        });
    }

    elements.skillsContainer.innerHTML = "";

    var category = state.skillCategory;
    var filtered = state.skillsData.filter(function (skill) {
        return category === "All" || skill.category === category;
    });

    filtered.forEach(function (skill) {
        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "lift");
        card.style.cssText = "padding:32px; text-align:center; background:#fff; border-radius:24px; box-shadow:0 4px 16px rgba(0,0,0,0.08); transition:box-shadow 0.3s, transform 0.3s; cursor:default;";

        var iconBox = document.createElement("div");
        iconBox.style.cssText = "width:80px; height:80px; margin:0 auto 16px auto; background:#14532d; border-radius:16px; display:flex; align-items:center; justify-content:center;";

        var iconText = document.createElement("span");
        iconText.style.cssText = "font-size:24px; color:#fff; font-weight:700;";
        iconText.textContent = skill.shortLabel;
        iconBox.appendChild(iconText);

        var badge = document.createElement("span");
        badge.style.cssText = "display:inline-block; margin-bottom:12px; padding:4px 12px; font-size:11px; font-weight:700; border-radius:9999px; background:#e0f2fe; color:#0369a1;";
        badge.textContent = skill.category;

        var skillName = document.createElement("h3");
        skillName.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px; color:#1f2937;";
        skillName.textContent = skill.name;

        var skillDescription = document.createElement("p");
        skillDescription.style.cssText = "font-size:13px; color:#6b7280; line-height:1.5;";
        skillDescription.textContent = skill.description;

        card.appendChild(iconBox);
        card.appendChild(badge);
        card.appendChild(skillName);
        card.appendChild(skillDescription);
        elements.skillsContainer.appendChild(card);
    });
}

function initSkillsFilter() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    if (elements.skillFilterButtons) {
        elements.skillFilterButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                state.skillCategory = btn.getAttribute("data-category"); // Update state only
                renderSkills();                                            // Render reads state
            });
        });
    }
}