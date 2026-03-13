// password and confirm password.js

const signupForm = document.getElementById("signupForm");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("message");

signupForm.addEventListener("submit", function(event){
    event.preventDefault();

    const password = signupPassword.value;
    const confirm = confirmPassword.value;
    // Password required
    if(!password){
        message.textContent = "Password is required.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }

    // Password length
    if(password.length < 8){
        message.textContent = "Password must be atleast 8 characters long.";
        message.style.color = "red";
        signupPassword.focus();
        return;
    }

    // Confirm password check
    if(password !== confirm){
        message.textContent = "Passwords do not match.";
        message.style.color = "red";
        confirmPassword.focus();
        return;
    }

    // Success 
    message.textContent = "Password matched successfully!";
    message.style.color = "green";
});

// clear message on input
signupPassword.addEventListener("input", () => message.textContent = "");
confirmPassword.addEventListener("input", () => message.textContent = "");