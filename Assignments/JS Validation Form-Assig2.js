//FeedbackAnalyser.js
const feedbackForm = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const typeInput = document.getElementById("type");
const feedbackTextInput = document.getElementById("feedbackText");
const message = document.getElementById("message");
const feedbackContainer = document.getElementById("feedbackContainer");
const count = document.getElementById("count");

let totalFeedback = 0;

feedbackForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const type = typeInput.value;
    const feedbackText = feedbackTextInput.value.trim();

    // Validation
    if (!name) {
        message.textContent = "Name is required";
        message.style.color = "red";
        nameInput.focus();
        return;
    }

    if (!email) {
        message.textContent = "Email is required";
        message.style.color = "red";
        emailInput.focus();
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        message.textContent = "Enter valid email";
        message.style.color = "red";
        emailInput.focus();
        return;
    }

    if (!type) {
        message.textContent = "Select feedback type";
        message.style.color = "red";
        typeInput.focus();
        return;
    }

    if (!feedbackText) {
        message.textContent = "Feedback is required";
        message.style.color = "red";
        feedbackTextInput.focus();
        return;
    }

    if (feedbackText.length < 20) {
        message.textContent = "Feedback must be at least 20 characters";
        message.style.color = "red";
        feedbackTextInput.focus();
        return;
    }

    // label
    let label = "";

    if (type === "Bug") {
        label = "[Needs Review]";
    }
    else if (type === "Suggestion") {
        label = "[Idea]";
    }
    else if (type === "Appreciation") {
        label = "[Positive]";
    }

    // Creating card
    const card = document.createElement("div");

    card.innerHTML = `
<h3></h3>
<p class="email"></p>
<p class="type"></p>
<p class="text"></p>
<button class="deleteBtn">Delete</button>
`;

    // Inserting safe text
    card.querySelector("h3").textContent = name;
    card.querySelector(".email").textContent = "Email: " + email;
    card.querySelector(".type").textContent = "Type: " + type + " " + label;
    card.querySelector(".text").textContent = feedbackText;

    // Delete button
    card.querySelector(".deleteBtn").addEventListener("click", function () {

        card.remove();
        totalFeedback--;
        count.textContent = totalFeedback;

    });

    // Adding card to page
    feedbackContainer.appendChild(card);

    // Updating feedback count
    totalFeedback++;
    count.textContent = totalFeedback;

    // Success 
    message.textContent = "Feedback submitted successfully";
    message.style.color = "green";

    // clearing input field
    nameInput.value = "";
    emailInput.value = "";
    typeInput.value = "";
    feedbackTextInput.value = "";

});


nameInput.addEventListener("input", () => message.textContent = "");
emailInput.addEventListener("input", () => message.textContent = "");
feedbackTextInput.addEventListener("input", () => message.textContent = "");