
function initProjectSort() {
    var elements = window.portfolioElements;
    var state = window.portfolioState;

    if (!elements.projectSort) return;

    elements.projectSort.addEventListener("change", function () {
        state.sortOrder = elements.projectSort.value; // Update state only
        state._projectFilterCache.result = null;      // Invalidate cache
        renderProjects();                              // Render reads state
    });
}