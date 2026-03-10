// innerText & textContent
// innerText: visible rendered text only
// textContent : all text nodes regardless of css
// innerHTML: allows reading or writing HTML markup inside an element

const message = document.getElementById("message");
const textContentBtn = document.getElementById("textContentBtn");
const textReset = document.getElementById("resetBtn");

document.getElementById("innerTxtBtn").addEventListener("click", function () {
    message.innerText = "Updated using innerText";
});

textContentBtn.addEventListener("click", function () {
    message.textContent = "Updated using textContent";
});

textReset.addEventListener("click", function () {
    message.innerText = "Original Message";
});

const box = document.getElementById("box");

document.getElementById("innerHTMLBtn").addEventListener("click", function () {
    box.innerHTML = "<strong>Original Content</strong>";
});