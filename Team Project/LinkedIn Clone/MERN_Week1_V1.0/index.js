const readline = require("readline");
const chalk = require("chalk");

const {
  createUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getOtherUsers
} = require("./user");

const {
  addSkill,
  addExperience,
  addEducation
} = require("./profile");
const eventBus = require("./events");
const {
  sendRequest,
  viewRequests,
  respondRequest,
  getConnections
} = require("./connection");

const {
  createPost,
  getFeed,
  likePost,
  commentPost
} = require("./post");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main Menu
function menu() {
  console.log(chalk.red("\n--- MENU ---"));
  console.log("1. Create Profile");
  console.log("2. Login");
  console.log("3. View My Profile");
  console.log("4. Edit Profile");
  console.log("5. View Other Profiles");
  console.log("6. Exit");
  console.log("7. Send Connection Request");
  console.log("8. View Requests");
  console.log("9. Respond to Request");
  console.log("10. View Connections");
  console.log("11. Create Post");
  console.log("12. View Feed");
  console.log("13. Like Post");
  console.log("14. Comment on Post");

  rl.question("Choose option: ", (choice) => {
    switch (choice) {

      // CREATE PROFILE
      case "1":
        rl.question("Enter Name: ", (name) => {
          rl.question("Enter Headline: ", (headline) => {
            const user = createUser(name, headline);
            console.log(chalk.green("Profile created!"));
            console.log(user);
            menu();
          });
        });
        break;

      // LOGIN
      case "2":
        console.log(getAllUsers());
        rl.question("Enter User ID to login: ", (id) => {
          const user = loginUser(Number(id));
          if (user) {
            console.log(chalk.green("Login successful"));
          } else {
            console.log(chalk.red("User not found"));
          }
          menu();
        });
        break;

      // VIEW MY PROFILE
      case "3":
        const current = getCurrentUser();
        if (!current) {
          console.log(chalk.red("Please login first"));
        } else {
          console.log(chalk.cyan("\nMy Profile:"));
          console.log(current);
        }
        menu();
        break;

      // EDIT PROFILE
      case "4":
        const user = getCurrentUser();
        if (!user) {
          console.log(chalk.red("Login required"));
          return menu();
        }

        console.log("\n1. Add Skill");
        console.log("2. Add Experience");
        console.log("3. Add Education");

        rl.question("Choose: ", (opt) => {
          if (opt === "1") {
            rl.question("Enter Skill: ", (skill) => {
              addSkill(user, skill);
              console.log(chalk.green("Skill added"));
              menu();
            });
          } else if (opt === "2") {
            rl.question("Enter Experience: ", (exp) => {
              addExperience(user, exp);
              console.log(chalk.green("Experience added"));
              menu();
            });
          } else if (opt === "3") {
            rl.question("Enter Education: ", (edu) => {
              addEducation(user, edu);
              console.log(chalk.green("Education added"));
              menu();
            });
          } else {
            console.log(chalk.red("Invalid option"));
            menu();
          }
        });
        break;

      // VIEW OTHER PROFILES
      case "5":
        const others = getOtherUsers();

        if (others.length === 0) {
          console.log(chalk.red("No other users found"));
        } else {
          console.log(chalk.blue("\nOther Profiles:"));
          others.forEach(u => {
            console.log(`ID: ${u.id} | Name: ${u.name} | Headline: ${u.headline}`);
          });
        }
        menu();
        break;
      // EXIT
      case "6":
        console.log("Goodbye!");
        rl.close();
        break;
      case "7":
        const user7 = getCurrentUser();
        rl.question("Enter User ID: ", (id) => {
          sendRequest(user7, Number(id), getAllUsers())
            .then(() => menu())
            .catch(err => {
              console.log(err);
              menu();
            });
        });
        break;
      case "8":
        const user8 = getCurrentUser();
        console.log(viewRequests(user8));
        menu();
        break;
      case "9":
        const user9 = getCurrentUser();
        rl.question("Sender ID: ", async (id) => {
          rl.question("accept/reject: ", async (action) => {
            await respondRequest(user9, Number(id), action);
            menu();
          });
        });
        break;
      case "10":
        const user10 = getCurrentUser();
        console.log(getConnections(user10));
        menu();
        break;
      case "11":
        const user11 = getCurrentUser();
        rl.question("Content: ", async (text) => {
          await createPost(user11, text);
          menu();
        });
        break;
      case "12":
        const user12 = getCurrentUser();
        const connections = getConnections(user12);
        console.log(getFeed(user12, connections));
        menu();
        break;
      case "13":
        const user13 = getCurrentUser();
        rl.question("Post ID: ", (id) => {
          likePost(user13, Number(id));
          menu();
        });
        break;
      case "14":
        const user14 = getCurrentUser();
        rl.question("Post ID: ", (id) => {
          rl.question("Comment: ", (text) => {
            commentPost(user14, Number(id), text);
            menu();
          });
        });
        break;

      default:
        console.log(chalk.red("Invalid choice"));
        menu();
    }
  });
}

menu();
