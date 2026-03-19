document.addEventListener("DOMContentLoaded", function () {
    renderSkills();
    renderCertifications();
    renderParticipations();
    renderPublications();

    initModal();
    initContactValidation();

    // Features
    initThemeToggle();
    initNavbarScroll();
    initProjectFilter();     
    initTodo();
    initImagePreview();
});
