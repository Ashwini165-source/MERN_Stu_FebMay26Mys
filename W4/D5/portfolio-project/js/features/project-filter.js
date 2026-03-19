function initProjectFilter() {

    const filterContainer = document.getElementById("project-filters");
    const projectContainer = document.getElementById("projects-container");
    const searchInput = document.getElementById("project-search");

    if (!filterContainer || !projectContainer) {
        console.log("Project filter elements not found");
        return;
    }

    // Collect unique categories
    const categories = ["All"];
    projectsData.forEach(function (project) {
        if (!categories.includes(project.category)) {
            categories.push(project.category);
        }
    });

    let activeCategory = "All";
    let searchQuery = "";

    // Styles for buttons (inline, avoids Tailwind JIT issues)
    function getActiveStyle() {
        return "padding:8px 20px; border-radius:9999px; border:2px solid #3b82f6; font-weight:600; font-size:14px; cursor:pointer; background:#3b82f6; color:#fff; transition:all 0.2s; margin:4px;";
    }
    function getInactiveStyle() {
        return "padding:8px 20px; border-radius:9999px; border:2px solid #3b82f6; font-weight:600; font-size:14px; cursor:pointer; background:#fff; color:#3b82f6; transition:all 0.2s; margin:4px;";
    }

    // Build filter buttons
    categories.forEach(function (cat) {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.dataset.category = cat;
        btn.style.cssText = cat === "All" ? getActiveStyle() : getInactiveStyle();

        btn.addEventListener("click", function () {
            activeCategory = cat;
            // Reset all button styles
            document.querySelectorAll("[data-category]").forEach(function (b) {
                b.style.cssText = getInactiveStyle();
            });
            // Activate clicked button
            btn.style.cssText = getActiveStyle();
            renderFiltered();
        });

        filterContainer.appendChild(btn);
    });

    function renderFiltered() {
        projectContainer.innerHTML = "";

        const filtered = projectsData.filter(function (project) {
            const matchCategory = activeCategory === "All" || project.category === activeCategory;
            const matchSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });

        if (filtered.length === 0) {
            const msg = document.createElement("p");
            msg.style.cssText = "grid-column:1/-1; text-align:center; color:#9ca3af; padding:48px; font-size:18px;";
            msg.textContent = "No projects found.";
            projectContainer.appendChild(msg);
            return;
        }

        filtered.forEach(function (project) {
            const card = document.createElement("div");
            card.style.cssText = "padding:32px; text-align:center; background:#fff; border-radius:24px; box-shadow:0 4px 16px rgba(0,0,0,0.08); transition:all 0.3s; cursor:default;";

            // Category badge
            const badge = document.createElement("span");
            badge.style.cssText = "display:inline-block; margin-bottom:12px; padding:4px 12px; font-size:12px; font-weight:700; border-radius:9999px; background:#dbeafe; color:#1d4ed8;";
            badge.textContent = project.category;

            // Name
            const projectName = document.createElement("h3");
            projectName.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px; color:#1f2937;";
            projectName.textContent = project.name;

            // Description
            const projectDescription = document.createElement("p");
            projectDescription.style.cssText = "font-size:13px; color:#6b7280; margin-bottom:12px; line-height:1.5;";
            projectDescription.textContent = project.description;

            // Technologies
            const techDiv = document.createElement("div");
            techDiv.style.cssText = "display:flex; flex-wrap:wrap; justify-content:center; gap:6px; margin-bottom:12px;";
            project.technologies.forEach(function (tech) {
                const tag = document.createElement("span");
                tag.style.cssText = "padding:2px 10px; font-size:11px; border-radius:6px; background:#f3f4f6; color:#374151;";
                tag.textContent = tech;
                techDiv.appendChild(tag);
            });

            // Status badge
            const statusBadge = document.createElement("span");
            if (project.status === "Live") {
                statusBadge.style.cssText = "display:inline-block; padding:4px 12px; font-size:12px; font-weight:700; border-radius:9999px; background:#dcfce7; color:#15803d;";
            } else {
                statusBadge.style.cssText = "display:inline-block; padding:4px 12px; font-size:12px; font-weight:700; border-radius:9999px; background:#fef9c3; color:#854d0e;";
            }
            statusBadge.textContent = project.status;

            // Links
            const linksDiv = document.createElement("div");
            linksDiv.style.cssText = "display:flex; justify-content:center; gap:16px; margin-top:14px;";

            const demoLink = document.createElement("a");
            demoLink.href = project.liveDemo;
            demoLink.style.cssText = "font-size:13px; font-weight:600; color:#3b82f6; text-decoration:none;";
            demoLink.textContent = "Live Demo";
            demoLink.addEventListener("mouseover", function () { demoLink.style.textDecoration = "underline"; });
            demoLink.addEventListener("mouseout", function () { demoLink.style.textDecoration = "none"; });

            const ghLink = document.createElement("a");
            ghLink.href = project.github;
            ghLink.style.cssText = "font-size:13px; font-weight:600; color:#6b7280; text-decoration:none;";
            ghLink.textContent = "GitHub";
            ghLink.addEventListener("mouseover", function () { ghLink.style.textDecoration = "underline"; });
            ghLink.addEventListener("mouseout", function () { ghLink.style.textDecoration = "none"; });

            linksDiv.appendChild(demoLink);
            linksDiv.appendChild(ghLink);

            card.appendChild(badge);
            card.appendChild(projectName);
            card.appendChild(projectDescription);
            card.appendChild(techDiv);
            card.appendChild(statusBadge);
            card.appendChild(linksDiv);

            // Hover effect
            card.addEventListener("mouseover", function () {
                card.style.boxShadow = "0 8px 30px rgba(0,0,0,0.14)";
                card.style.transform = "translateY(-4px)";
            });
            card.addEventListener("mouseout", function () {
                card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                card.style.transform = "translateY(0)";
            });

            projectContainer.appendChild(card);
        });
    }

    // Wire up search
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            searchQuery = searchInput.value;
            renderFiltered();
        });
    }

    renderFiltered();
    console.log("Project filter initialized successfully");
}