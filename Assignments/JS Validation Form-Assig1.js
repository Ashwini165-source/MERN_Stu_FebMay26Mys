//FAQBuilder.js

const faqForm = document.getElementById("faqForm");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const message = document.getElementById("message");
const faqContainer = document.getElementById("faqContainer");

faqForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    // Question validation
    if (!question) {
        message.textContent = "Question is required";
        message.style.color = "red";
        questionInput.focus();
        return;
    }

    if (question.length < 5) {
        message.textContent = "Question must be atleast 5 characters";
        message.style.color = "red";
        questionInput.focus();
        return;
    }

    // Answer validation
    if (!answer) {
        message.textContent = "Answer is required";
        message.style.color = "red";
        answerInput.focus();
        return;
    }

    if (answer.length < 15) {
        message.textContent = "Answer must be atleast 15 characters";
        message.style.color = "red";
        answerInput.focus();
        return;
    }

    // Removing NO FAQ available msg
    const emptyMsg = document.getElementById("emptyMsg");
    if (emptyMsg) {
        emptyMsg.remove();
    }

    // Creating FAQ block
    const faqDiv = document.createElement("div");

    // Question heading
    const qHeading = document.createElement("h3");
    qHeading.textContent = question;

    // Insert badge using insertAdjacentHTML
    qHeading.insertAdjacentHTML("beforeend", " <span>[FAQ]</span>");

    // Answer paragraph
    const aPara = document.createElement("p");
    aPara.textContent = answer;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {

        faqDiv.remove();

        if (faqContainer.children.length === 0) {
            faqContainer.innerHTML = "<p id='emptyMsg'>No FAQs available</p>";
        }

    });

    // Append elements
    faqDiv.appendChild(qHeading);
    faqDiv.appendChild(aPara);
    faqDiv.appendChild(deleteBtn);
    //add FAQ block to page
    faqContainer.appendChild(faqDiv);

    // Success message
    message.textContent = "FAQ added successfully";
    message.style.color = "green";

    // Clear inputs
    questionInput.value = "";
    answerInput.value = "";

});

// Clear message on input
questionInput.addEventListener("input", () => message.textContent = "");
answerInput.addEventListener("input", () => message.textContent = "");