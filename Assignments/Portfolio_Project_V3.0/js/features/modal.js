function initModal() {
    var elements = window.portfolioElements;
    if (!elements.modal || !elements.modalContent || !elements.modalTrigger || !elements.modalClose || !elements.formCancel) {
        return;
    }

    function openModal() {
        elements.modal.classList.remove("hidden");
        // Trigger animation after render
        setTimeout(function () {
            elements.modalContent.classList.remove("scale-95", "opacity-0");
        }, 10);
    }

    function closeModal() {
        elements.modalContent.classList.add("scale-95", "opacity-0");
        setTimeout(function () {
            elements.modal.classList.add("hidden");
        }, 200);
    }

    elements.modalTrigger.addEventListener("click", openModal);
    elements.modalClose.addEventListener("click", closeModal);
    elements.formCancel.addEventListener("click", closeModal);

    // Close when clicking on the backdrop
    elements.modal.addEventListener("click", function (event) {
        if (event.target === elements.modal) {
            closeModal();
        }
    });
}