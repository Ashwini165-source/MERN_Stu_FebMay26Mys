
// Role-Based Route Resolver Using switch + Functions
// Function Expression
const getRoute = function(role, isLoggedIn) {
    
    //  Check if user is logged in
    if (!isLoggedIn) {
        return "/login";
    } 
    else {
        //  Using switch for role routing
        switch(role) {
            case "admin":
                return "/admin";
            
            case "student":
                return "/student";
            
            case "college":
                return "/college";
            
            case "proctor":
                return "/proctor";
            
            default:
                return "/denied";
        }
    }
};

let role = "student";
let isLoggedIn = true;
let result = getRoute(role, isLoggedIn);

console.log("Role:", role);
console.log("Is Logged In:", isLoggedIn);
console.log("Route:", result);