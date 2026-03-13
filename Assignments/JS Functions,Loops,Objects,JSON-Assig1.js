
// Password Strength Tagger

function tagPassword(password) {
    if (typeof password !== "string") {
        return "INVALID";
    }

    let hasLetter = false;
    let hasNumber = false;

    for (let i = 0; i < password.length; i++) {
        let ch = password[i];

        if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {
            hasLetter = true;
        }
        if (ch >= '0' && ch <= '9') {
            hasNumber = true;
        }
    }
    if (password.length < 8) {
        return "WEAK";
    }

    if (password.length >= 12 && hasLetter && hasNumber) {
        return "STRONG";
    }

    if (password.length >= 8 && hasLetter && hasNumber) {
        return "MEDIUM";
    }

    return "WEAK";
}


console.log(tagPassword("ashu"));           // WEAK
console.log(tagPassword("Ashu12345"));      // MEDIUM
console.log(tagPassword("Ashu123456789"));  // STRONG
console.log(tagPassword(12345678));        // INVALID