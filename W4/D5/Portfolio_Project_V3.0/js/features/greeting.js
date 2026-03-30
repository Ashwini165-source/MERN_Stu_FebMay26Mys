function renderGreeting() {
    var elements = window.portfolioElements;
    if (!elements.heroGreeting) return;

    var hour = new Date().getHours();
    var greeting = "Good evening";
    var emoji = "🌙";

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning";
        emoji = "☀️";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon";
        emoji = "☕";
    }

    elements.heroGreeting.textContent = greeting + " " + emoji + ",";
}