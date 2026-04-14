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

      default:
        console.log(chalk.red("Invalid choice"));
        menu();
    }
  });
}

menu();
