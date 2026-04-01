//Generating token using login function and verifying the token

const jwt = require("jsonwebtoken");

const secretKey = "Ashu123";

const wrongSecretKey = "Ashwini123";
function loginUser(email, password) {
    if (email === "correct@email.com" && password === "mp123") {
        const token = jwt.sign(
            {
                userId: 101,
                email: email,
                role: "student"
            }, secretKey, { expiresIn: "1h" }
        );
        return {
            success: true,
            token: token
        };
    }
    return {
        success: false,
        message: "Invalid Credentials"
    };
}
const loginResult = loginUser("correct@email.com", "mp123");
console.log("Login result:", loginResult);

if(loginResult.success) {
    try {
        const verifiedPayload = jwt.verify(loginResult.token,wrongSecretKey,secretKey);
        
            console.log("verified Payload: ", verifiedPayload);
    }
    catch (error) {
    console.error("verification failed:", error.message);
    }
}