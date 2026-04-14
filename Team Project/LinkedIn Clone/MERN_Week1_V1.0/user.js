let users = [];
let currentUser = null;

// Create Profile
function createUser(name, headline) {
    const user = {
        id: users.length + 1,
        name,
        headline,
        skills: [],
        experience: [],
        education: []
    };

    users.push(user);
    currentUser = user;
    return user;
}

// Login
function loginUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        currentUser = user;
        return user;
    }
    return null;
}

function getCurrentUser() {
    return currentUser;
}

function getAllUsers() {
    return users;
}

module.exports = {
    createUser,
    loginUser,
    getCurrentUser,
    getAllUsers
};
// Get all users except current user
function getOtherUsers() {
  console.log("users",users);
  console.log("currentUsers", currentUser);
  
  const others = users.filter((u) => u.id !== currentUser.id);
  console.log("others ",others);
  
    return others;
}

module.exports.getOtherUsers = getOtherUsers;
