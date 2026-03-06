//Basics of Click Event
const button = document.getElementById("clickBtn");

button.addEventListener("click",function() {
    console.log("Button is clicked");
});
button.addEventListener("click",function() {
    console.log("Second Event Listener : Button is clicked");
});