function updateScrollMetrics() {
    var state = window.portfolioState;
    var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    state.totalScrollableHeight = totalHeight > 0 ? totalHeight : 0;
}

function renderScrollProgress() {
    var state = window.portfolioState;
    var elements = window.portfolioElements;

    if (!elements.scrollProgressBar) {
        state.scrollRafId = 0;
        return;
    }

    var ratio = state.totalScrollableHeight === 0
        ? 0
        : Math.min(1, Math.max(0, (window.scrollY / state.totalScrollableHeight)));

    // Update width percentage as specified
    elements.scrollProgressBar.style.width = Math.round(ratio * 100) + "%";
    state.scrollRafId = 0;
}

function scheduleScrollProgressRender() {
    var state = window.portfolioState;
    if (state.scrollRafId) return;
    state.scrollRafId = requestAnimationFrame(renderScrollProgress);
}