
function applyTheme(theme) {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    state.theme = (theme === "dark") ? "dark" : "light";
    if (state.theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    if (elements.themeToggle) {
        elements.themeToggle.textContent = state.theme === "dark" ? "☀ Light" : "🌙 Dark";
        elements.themeToggle.setAttribute("aria-pressed", state.theme === "dark" ? "true" : "false");
    }
    if (elements.themeToggleMobile) {
        elements.themeToggleMobile.textContent = state.theme === "dark" ? "☀ Light" : "🌙 Dark";
        elements.themeToggleMobile.setAttribute("aria-pressed", state.theme === "dark" ? "true" : "false");
    }

    localStorage.setItem("portfolio-theme", state.theme);
}

function loadSavedTheme() {
    var savedTheme = localStorage.getItem("portfolio-theme");
    applyTheme(savedTheme === "dark" ? "dark" : "light");
}

function initThemeToggle() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    loadSavedTheme();

    if (elements.themeToggle) {
        elements.themeToggle.addEventListener("click", function () {
            applyTheme(state.theme === "dark" ? "light" : "dark");
        });
    }
    if (elements.themeToggleMobile) {
        elements.themeToggleMobile.addEventListener("click", function () {
            applyTheme(state.theme === "dark" ? "light" : "dark");
        });
    }
}