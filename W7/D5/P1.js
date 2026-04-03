//How Cookie is used to track the sesssion ID
//Simulated server-side session store
const sessionStore = {
    "abc123":{
        userId: 101,
        username: "Ashwini",
        role:"admin"
        }
    };
//Simulated browser cookie value
const browserCookieSessionId = "abc123";

const sessionData = sessionStore[browserCookieSessionId];
console.log("Server-side session data:",sessionData);