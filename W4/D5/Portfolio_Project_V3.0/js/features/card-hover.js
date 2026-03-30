
function handleCardHover(event, isEnter) {
    // Disable hover effects on non-hover or coarse pointer devices
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }
    var target = event.target;
    if (!(target instanceof Element)) return;
    var card = target.closest("[data-hover-type]");
    if (!card) return;

    var hoverType = card.getAttribute("data-hover-type");

    if (hoverType === "lift") {
        card.style.boxShadow = isEnter
            ? "0 8px 30px rgba(0,0,0,0.14)"
            : "0 4px 16px rgba(0,0,0,0.08)";
        card.style.transform = isEnter ? "translateY(-4px)" : "translateY(0)";
        return;
    }

    if (hoverType === "scale") {
        card.style.transform = isEnter ? "scale(1.05)" : "scale(1)";
    }
}