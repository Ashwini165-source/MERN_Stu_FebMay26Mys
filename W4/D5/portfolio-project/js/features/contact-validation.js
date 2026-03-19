function initContactValidation() {

    const contactModal = document.getElementById("contact-modal");
    const contactForm = document.getElementById("contact-form");
    const contactName = document.getElementById("contact-name");
    const contactEmail = document.getElementById("contact-email");
    const contactMessage = document.getElementById("contact-message");
    const formMessage = document.getElementById("form-message");
    const charCounter = document.getElementById("char-counter");

    const MAX_CHARS = 200;

    if (!contactModal || !contactForm || !contactName || !contactEmail || !formMessage) {
        console.log("Contact form elements not found");
        return;
    }

    // Character counter for message textarea
    if (contactMessage && charCounter) {
        contactMessage.addEventListener("input", function () {
            const remaining = MAX_CHARS - contactMessage.value.length;
            charCounter.textContent = remaining + " / " + MAX_CHARS + " characters remaining";
            if (remaining < 20) {
                charCounter.className = "text-xs text-red-500 mt-1";
            } else if (remaining < 50) {
                charCounter.className = "text-xs text-yellow-500 mt-1";
            } else {
                charCounter.className = "text-xs text-gray-400 mt-1";
            }
        });
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage ? contactMessage.value.trim() : "";

        formMessage.textContent = "";
        formMessage.className = "text-sm";

        //Name validation
        if (name === "") {
            formMessage.textContent = "Name is required";
            formMessage.classList.add("text-red-500");
            contactName.focus();
            return;
        }
        if (name.length < 5) {
            formMessage.textContent = "Name must be at least 5 chars";
            formMessage.classList.add("text-red-500");
            contactName.focus();
            return;
        }
        //Email validation
        if (email === "") {
            formMessage.textContent = "Email is required";
            formMessage.classList.add("text-red-500");
            contactEmail.focus();
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            formMessage.textContent = "Enter a valid email";
            formMessage.classList.add("text-red-500");
            contactEmail.focus();
            return;
        }

        // Message validation
        if (contactMessage && message === "") {
            formMessage.textContent = "Message cannot be empty";
            formMessage.classList.add("text-red-500");
            contactMessage.focus();
            return;
        }

        formMessage.textContent = "Message submitted successfully!";
        formMessage.classList.add("text-green-600");
        console.log("Valid credentials:", { name: name, email: email, message: message });
        contactForm.reset();
        if (charCounter) charCounter.textContent = MAX_CHARS + " / " + MAX_CHARS + " characters remaining";
    });

    contactName.addEventListener("input", function () {
        formMessage.textContent = "";
    });
    contactEmail.addEventListener("input", function () {
        formMessage.textContent = "";
    });
}