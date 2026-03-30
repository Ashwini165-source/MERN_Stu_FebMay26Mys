
function renderProjects() {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    if (!elements.projectsContainer || !Array.isArray(state.projectsData)) return;

    var result = [];
    var q = state.searchQuery.toLowerCase();

    // Defensive Category Fallback
    var validCategories = ["All"];
    if (elements.filterButtons && elements.filterButtons.length > 0) {
        validCategories = elements.filterButtons.map(function (b) {
            return b.getAttribute("data-category");
        });
    }
    if (!validCategories.includes(state.categoryFilter)) {
        state.categoryFilter = "All";
    }

    var c = state.categoryFilter;
    var s = state.sortOrder;
    var cache = state._projectFilterCache;

    // Use memoised result if inputs haven't changed
    if (cache && cache.query === q && cache.category === c && cache.sort === s && cache.result) {
        result = cache.result;
    } else {
        result = [].concat(state.projectsData); // Shallow clone — never mutate source

        if (q) {
            result = result.filter(function (project) {
                return project.name.toLowerCase().includes(q) ||
                    project.description.toLowerCase().includes(q) ||
                    project.category.toLowerCase().includes(q) ||
                    project.technologies.some(function (tech) {
                        return tech.toLowerCase().includes(q);
                    });
            });
        }

        if (c !== "All") {
            result = result.filter(function (project) { return project.category === c; });
        }

        if (s === "az") {
            result.sort(function (a, b) { return a.name.localeCompare(b.name); });
        } else if (s === "za") {
            result.sort(function (a, b) { return b.name.localeCompare(a.name); });
        }

        if (cache) {
            cache.query = q;
            cache.category = c;
            cache.sort = s;
            cache.result = result;
        }
    }

    // Update filter button active styles from state (single canonical location)
    if (elements.filterButtons) {
        elements.filterButtons.forEach(function (b) {
            var isActive = b.getAttribute("data-category") === state.categoryFilter;
            b.className = isActive
                ? "filter-btn px-6 py-2 rounded-full border-2 border-blue-500 bg-blue-500 text-white font-bold transition-all"
                : "filter-btn px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold transition-all";
        });
    }

    // Sync search input value with state
    if (elements.projectSearch && elements.projectSearch.value !== state.searchQuery) {
        elements.projectSearch.value = state.searchQuery;
    }

    // Project count display
    if (elements.projectCount) {
        elements.projectCount.textContent = result.length + " project" + (result.length === 1 ? "" : "s") + " found";
    }

    elements.projectsContainer.innerHTML = "";

    if (result.length === 0) {
        var msg = document.createElement("p");
        msg.style.cssText = "grid-column:1/-1; text-align:center; color:#9ca3af; padding:48px; font-size:18px;";
        msg.textContent = "No projects found.";
        elements.projectsContainer.appendChild(msg);
        return;
    }

    // Use DocumentFragment for a single O(1) DOM paint
    var fragment = document.createDocumentFragment();

    result.forEach(function (project) {
        var card = document.createElement("div");
        card.setAttribute("data-hover-type", "lift");
        card.style.cssText = "padding:32px; text-align:center; background:#fff; border-radius:24px; box-shadow:0 4px 16px rgba(0,0,0,0.08); transition:all 0.3s; cursor:pointer;";

        card.addEventListener("click", function () {
            recordProjectView(project.name);
        });

        var badge = document.createElement("span");
        badge.style.cssText = "display:inline-block; margin-bottom:12px; padding:4px 12px; font-size:12px; font-weight:700; border-radius:9999px; background:#dbeafe; color:#1d4ed8;";
        badge.textContent = project.category;

        var projectName = document.createElement("h3");
        projectName.style.cssText = "font-size:18px; font-weight:700; margin-bottom:8px; color:#1f2937;";
        projectName.textContent = project.name;

        var projectDescription = document.createElement("p");
        projectDescription.style.cssText = "font-size:13px; color:#6b7280; margin-bottom:12px; line-height:1.5;";

        if (project.description.length > 100) {
            var isExpanded = !!state.expandedProjects[project.name];
            var textSpan = document.createElement("span");
            textSpan.textContent = isExpanded
                ? project.description
                : project.description.slice(0, 100) + "...";

            var toggleBtn = document.createElement("button");
            toggleBtn.textContent = isExpanded ? "View Less" : "View More";
            toggleBtn.style.cssText = "color:#3b82f6; font-weight:600; cursor:pointer; background:none; border:none; padding:0; margin-left:4px;";

            toggleBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                state.expandedProjects[project.name] = !isExpanded; // Update state only
                renderProjects();                                     // Re-render from state
            });

            projectDescription.appendChild(textSpan);
            projectDescription.appendChild(document.createTextNode(" "));
            projectDescription.appendChild(toggleBtn);
        } else {
            projectDescription.textContent = project.description;
        }

        var techDiv = document.createElement("div");
        techDiv.style.cssText = "display:flex; flex-wrap:wrap; justify-content:center; gap:6px; margin-bottom:12px;";
        project.technologies.forEach(function (tech) {
            var tag = document.createElement("span");
            tag.style.cssText = "padding:2px 10px; font-size:11px; border-radius:6px; background:#f3f4f6; color:#374151;";
            tag.textContent = tech;
            techDiv.appendChild(tag);
        });

        var statusBadge = document.createElement("span");
        statusBadge.style.cssText = project.status === "Live"
            ? "display:inline-block; padding:4px 12px; font-size:12px; font-weight:700; border-radius:9999px; background:#dcfce7; color:#15803d;"
            : "display:inline-block; padding:4px 12px; font-size:12px; font-weight:700; border-radius:9999px; background:#fef9c3; color:#854d0e;";
        statusBadge.textContent = project.status;

        var linksDiv = document.createElement("div");
        linksDiv.style.cssText = "display:flex; justify-content:center; gap:16px; margin-top:14px;";

        var demoLink = document.createElement("a");
        demoLink.href = project.liveDemo;
        demoLink.style.cssText = "font-size:13px; font-weight:600; color:#3b82f6; text-decoration:none;";
        demoLink.textContent = "Live Demo";
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";

        var ghLink = document.createElement("a");
        ghLink.href = project.github;
        ghLink.style.cssText = "font-size:13px; font-weight:600; color:#6b7280; text-decoration:none;";
        ghLink.textContent = "GitHub";
        ghLink.target = "_blank";
        ghLink.rel = "noopener noreferrer";

        linksDiv.appendChild(demoLink);
        linksDiv.appendChild(ghLink);

        card.appendChild(badge);
        card.appendChild(projectName);
        card.appendChild(projectDescription);
        card.appendChild(techDiv);
        card.appendChild(statusBadge);
        card.appendChild(linksDiv);
        fragment.appendChild(card);
    });

    elements.projectsContainer.appendChild(fragment); // Single DOM paint
}

// ── Recently Viewed Projects ──────────────────────────────────────────────────

var RECENT_KEY = "portfolio-recent-projects";

function recordProjectView(projectName) {
    var recent = [];
    try {
        var saved = localStorage.getItem(RECENT_KEY);
        if (saved) recent = JSON.parse(saved);
    } catch (e) { }

    // Avoid duplicates using includes()
    if (recent.includes(projectName)) {
        recent = recent.filter(function (name) { return name !== projectName; });
    }
    recent.unshift(projectName);   // Move to front
    recent = recent.slice(0, 5);   // Keep last 5 only

    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    renderRecentProjects();
}

function renderRecentProjects() {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    if (!elements.recentProjectsWrapper || !elements.recentProjectsContainer) return;

    var recent = [];
    try {
        var saved = localStorage.getItem(RECENT_KEY);
        if (saved) recent = JSON.parse(saved);
    } catch (e) { }

    if (recent.length === 0) {
        elements.recentProjectsWrapper.classList.add("hidden");
        return;
    }

    elements.recentProjectsWrapper.classList.remove("hidden");
    elements.recentProjectsContainer.innerHTML = "";

    recent.forEach(function (projectName) {
        var project = state.projectsData.find(function (p) { return p.name === projectName; });
        if (!project) return;

        var badge = document.createElement("span");
        badge.style.cssText = "display:inline-flex; align-items:center; padding:8px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:9999px; font-size:13px; font-weight:600; color:#334155; box-shadow:0 1px 2px rgba(0,0,0,0.05); cursor:pointer; transition:all 0.2s;";
        badge.textContent = project.name;

        badge.addEventListener("mouseover", function () {
            badge.style.borderColor = "#3b82f6";
            badge.style.color = "#3b82f6";
            badge.style.transform = "translateY(-2px)";
            badge.style.boxShadow = "0 4px 6px -1px rgba(59, 130, 246, 0.1)";
        });
        badge.addEventListener("mouseout", function () {
            badge.style.borderColor = "#e2e8f0";
            badge.style.color = "#334155";
            badge.style.transform = "translateY(0)";
            badge.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
        });

        badge.addEventListener("click", function (e) {
            e.stopPropagation();
            state.searchQuery = project.name;      // Update state only
            state.categoryFilter = "All";
            renderProjects();                       // Render reads state
            var projectsSection = document.getElementById("projects");
            if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
        });

        elements.recentProjectsContainer.appendChild(badge);
    });
}