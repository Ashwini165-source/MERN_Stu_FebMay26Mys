function initThemeToggle() {

    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    if (!toggleBtn) {
        console.log("Theme toggle button not found");
        return;
    }

    // Restore saved theme on load
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        toggleBtn.textContent = "☀ Light";
    } else {
        toggleBtn.textContent = "🌙 Dark";
    }

    toggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("portfolio-theme", "dark");
            toggleBtn.textContent = "☀ Light";
            console.log("Dark mode enabled");
        } else {
            localStorage.setItem("portfolio-theme", "light");
            toggleBtn.textContent = "🌙 Dark";
            console.log("Light mode enabled");
        }
    });

    console.log("Theme toggle initialized successfully");
}