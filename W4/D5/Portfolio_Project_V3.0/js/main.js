
// ── 1. Global State ────────────────────────────────────────────────────────────
window.portfolioState = {
    projectsData:        typeof projectsData !== "undefined" ? projectsData : [],
    skillsData:          typeof skillsData   !== "undefined" ? skillsData   : [],
    theme:               "light",
    searchQuery:         "",
    categoryFilter:      "All",
    sortOrder:           "default",
    skillCategory:       "All",
    totalScrollableHeight: 0,
    scrollRafId:         0,
    spyThrottleTimer:    0,
    expandedProjects:    {},
    _projectFilterCache: { query: null, category: null, sort: null, result: null }
};

// ── 2. DOM Element Cache ───────────────────────────────────────────────────────
window.portfolioElements = {};

function cacheElements() {
    var e = window.portfolioElements;

    e.skillsContainer         = document.getElementById("skills-container");
    e.certificationsContainer = document.getElementById("certifications-container");
    e.participationsContainer = document.getElementById("participations-container");
    e.publicationsContainer   = document.getElementById("publications-container");
    e.projectsContainer       = document.getElementById("projects-container");
    e.recentProjectsWrapper   = document.getElementById("recent-projects-wrapper");
    e.recentProjectsContainer = document.getElementById("recent-projects-container");
    e.projectSearch           = document.getElementById("project-search");
    e.projectSort             = document.getElementById("project-sort");
    e.projectCount            = document.getElementById("project-count");
    e.typingText              = document.getElementById("hero-typing-text");
    e.heroGreeting            = document.getElementById("hero-greeting");
    e.heroLocation            = document.getElementById("hero-location");
    e.filterButtons           = Array.from(document.querySelectorAll(".filter-btn"));
    e.skillFilterButtons      = Array.from(document.querySelectorAll(".skill-filter-btn"));
    e.scrollProgressBar       = document.getElementById("scroll-progress-bar");
    e.navLinks                = Array.from(document.querySelectorAll("#main-navbar a[href^='#']"));
    e.spySections             = e.navLinks
        .map(function (link) {
            var sectionId = link.getAttribute("href");
            if (!sectionId || sectionId === "#") return null;
            return document.querySelector(sectionId);
        })
        .filter(function (section) { return section instanceof Element; });
    e.themeToggle             = document.getElementById("theme-toggle");
    e.themeToggleMobile       = document.getElementById("theme-toggle-mobile");
    e.modalTriggerMobile      = document.getElementById("modal-trigger-mobile");
    e.modal                   = document.getElementById("contact-modal");
    e.modalContent            = document.getElementById("modal-content");
    e.modalTrigger            = document.getElementById("modal-trigger");
    e.modalClose              = document.getElementById("modal-close");
    e.formCancel              = document.getElementById("form-cancel");
    e.contactForm             = document.getElementById("contact-form");
    e.contactName             = document.getElementById("contact-name");
    e.contactEmail            = document.getElementById("contact-email");
    e.contactMessage          = document.getElementById("contact-message");
    e.formMessage             = document.getElementById("form-message");
    e.backToTop               = document.getElementById("back-to-top");
}

// ── 3. Application Init ────────────────────────────────────────────────────────
function init() {
    cacheElements();

    // Hero features
    renderGreeting();
    fetchUserLocation();
    initTypingAnimation();

    // Theme
    initThemeToggle();

    // Section renderers
    renderSkills();
    renderCertifications();
    renderParticipations();
    renderPublications();
    renderProjects();
    renderRecentProjects();

    // Skills filter buttons
    initSkillsFilter();

    // Project interactivity
    initProjectSearch();
    initProjectFilter();
    initProjectSort();

    // UI features
    initBackToTop();
    initModal();
    initContactForm();

    // Scroll metrics initial paint
    updateScrollMetrics();
    scheduleScrollProgressRender();
    updateActiveNavLink();

    // ── 4. Global Scroll + Resize Listeners ───────────────────────────────────
    window.addEventListener("scroll", scheduleScrollProgressRender, { passive: true });
    window.addEventListener("scroll", throttledScrollSpyUpdate,     { passive: true });

    window.addEventListener("resize", function () {
        updateScrollMetrics();
        scheduleScrollProgressRender();
        updateActiveNavLink();
    });

    // Delegated hover effects on all dynamic containers
    [
        window.portfolioElements.skillsContainer,
        window.portfolioElements.certificationsContainer,
        window.portfolioElements.participationsContainer,
        window.portfolioElements.publicationsContainer,
        window.portfolioElements.projectsContainer
    ].forEach(function (container) {
        if (!container) return;
        // Only bind hover listeners for fine pointers that support hover
        var enableHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!enableHover) return;
        container.addEventListener("mouseover", function (event) { handleCardHover(event, true);  });
        container.addEventListener("mouseout",  function (event) { handleCardHover(event, false); });
    });
}

// Run immediately — scripts are at the bottom of <body>
init();