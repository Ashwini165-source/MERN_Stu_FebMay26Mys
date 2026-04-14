const EventEmitter = require("events");
const chalk = require("chalk");

const eventBus = new EventEmitter();

// Event listeners
eventBus.on("sessionStarted", () => {
  console.log(chalk.green("Session started"));
});

eventBus.on("profileCreated", (user) => {
  console.log(chalk.green(`Profile created for ${user.name}`));
});

eventBus.on("connectionRequested", (req) => {
  console.log(chalk.yellow(`Connection request sent to User ${req.receiverId}`));
});

eventBus.on("connectionAccepted", () => {
  console.log(chalk.green("Connection accepted"));
});

eventBus.on("connectionRejected", () => {
  console.log(chalk.red("Connection rejected"));
});

eventBus.on("postCreated", () => {
  console.log(chalk.green("Post created successfully"));
});

eventBus.on("postLiked", () => {
  console.log(chalk.blue("Post liked"));
});

eventBus.on("commentAdded", () => {
  console.log(chalk.magenta("Comment added"));
});

eventBus.on("feedViewed", () => {
  console.log(chalk.cyan("Feed loaded"));
});

eventBus.on("operationFailed", (msg) => {
  console.log(chalk.red(msg));
});

module.exports = eventBus;