const signupForm = document.getElementById("signupForm");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const message = document.getElementById("message");

signupForm.addEventListener("Submit",function(event){
    event.preventDefault();

    if(!email){
        message.textContent = "Email is required ";
        message.style.color="red";
        signupEmail.focus();
        return;
    }
})