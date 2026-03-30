function updateActiveNavLink() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    if (!elements.navLinks || elements.navLinks.length === 0 ||
        !elements.spySections || elements.spySections.length === 0) {
        return;
    }

    var offsetThreshold = 100;
    var currentPosition = window.scrollY + offsetThreshold;
    var activeSectionId = "";

    var isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 5;

    if (isAtBottom && elements.spySections.length > 0) {
        activeSectionId = elements.spySections[elements.spySections.length - 1].id;
    } else {
        elements.spySections.forEach(function (section) {
            if (currentPosition >= section.offsetTop) {
                activeSectionId = section.id;
            }
        });
    }

    elements.navLinks.forEach(function (link) {
        var targetId = (link.getAttribute("href") || "").replace("#", "");
        link.classList.toggle("nav-active", targetId !== "" && targetId === activeSectionId);
    });
}

function throttledScrollSpyUpdate() {
    var state = window.portfolioState;
    if (state.spyThrottleTimer) return;
    state.spyThrottleTimer = window.setTimeout(function () {
        updateActiveNavLink();
        state.spyThrottleTimer = 0;
    }, 100);
}