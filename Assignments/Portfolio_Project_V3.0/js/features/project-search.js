
function initProjectSearch() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    if (!elements.projectSearch) return;

    var searchTimeout;

    elements.projectSearch.addEventListener("input", function () {
        clearTimeout(searchTimeout); // Cancel any pending timer
        searchTimeout = setTimeout(function () {
            state.searchQuery = elements.projectSearch.value.trim(); // Update state only
            state._projectFilterCache.result = null;                 // Invalidate cache
            renderProjects();                                         // Render reads state
        }, 300);
    });
}