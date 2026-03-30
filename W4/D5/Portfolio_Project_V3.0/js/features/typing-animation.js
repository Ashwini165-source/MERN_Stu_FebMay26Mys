
function initTypingAnimation() {
    var elements = window.portfolioElements;
    if (!elements.typingText) return;

    var roles = ["Full-Stack Developer", "MERN Enthusiast", "Competitive Programmer"];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function typeEffect() {
        var currentRole = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
            elements.typingText.textContent = currentRole.slice(0, charIndex);
        } else {
            charIndex++;
            elements.typingText.textContent = currentRole.slice(0, charIndex);
        }

        var typingSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;   // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;    // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 500);
}