
var CONTACT_STORAGE_KEY = "portfolio-contact-form";

function saveContactForm() {
    var elements = window.portfolioElements;
    if (!elements.contactName || !elements.contactEmail || !elements.contactMessage) return;
    var data = {
        name: elements.contactName.value,
        email: elements.contactEmail.value,
        message: elements.contactMessage.value
    };
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(data));
}

function loadContactForm() {
    var elements = window.portfolioElements;
    if (!elements.contactName || !elements.contactEmail || !elements.contactMessage) return;
    var saved = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (saved) {
        try {
            var data = JSON.parse(saved);
            elements.contactName.value = data.name || "";
            elements.contactEmail.value = data.email || "";
            elements.contactMessage.value = data.message || "";
        } catch (e) {
            console.error("Error parsing saved contact form data", e);
        }
    }
}

function clearContactFormStorage() {
    localStorage.removeItem(CONTACT_STORAGE_KEY);
}

function clearFormMessage() {
    var elements = window.portfolioElements;
    if (elements.formMessage) elements.formMessage.textContent = "";
}

function handleContactSubmit(event) {
    event.preventDefault();
    var elements = window.portfolioElements;
    if (!elements.contactName || !elements.contactEmail || !elements.formMessage) return;

    var name = elements.contactName.value.trim();
    var email = elements.contactEmail.value.trim();
    var message = elements.contactMessage ? elements.contactMessage.value.trim() : "";
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    elements.formMessage.textContent = "";
    elements.formMessage.className = "text-sm";

    if (name === "") {
        elements.formMessage.textContent = "Name is required";
        elements.formMessage.classList.add("text-red-500");
        elements.contactName.focus();
        return;
    }
    if (name.length < 5) {
        elements.formMessage.textContent = "Name must be at least 5 chars";
        elements.formMessage.classList.add("text-red-500");
        elements.contactName.focus();
        return;
    }
    if (email === "") {
        elements.formMessage.textContent = "Email is required";
        elements.formMessage.classList.add("text-red-500");
        elements.contactEmail.focus();
        return;
    }
    if (!emailPattern.test(email)) {
        elements.formMessage.textContent = "Enter a valid email";
        elements.formMessage.classList.add("text-red-500");
        elements.contactEmail.focus();
        return;
    }
    if (elements.contactMessage && message === "") {
        elements.formMessage.textContent = "Message cannot be empty";
        elements.formMessage.classList.add("text-red-500");
        elements.contactMessage.focus();
        return;
    }

    elements.formMessage.textContent = "Message submitted successfully!";
    elements.formMessage.classList.add("text-green-600");
    if (elements.contactForm) elements.contactForm.reset();
    clearContactFormStorage();
}

function initContactForm() {
    var elements = window.portfolioElements;

    if (elements.contactForm) {
        elements.contactForm.addEventListener("submit", handleContactSubmit);
    }
    if (elements.contactName) {
        elements.contactName.addEventListener("input", clearFormMessage);
        elements.contactName.addEventListener("input", saveContactForm);
    }
    if (elements.contactEmail) {
        elements.contactEmail.addEventListener("input", clearFormMessage);
        elements.contactEmail.addEventListener("input", saveContactForm);
    }
    if (elements.contactMessage) {
        elements.contactMessage.addEventListener("input", saveContactForm);
    }

    loadContactForm();
}