const cron = require("node-cron");
const taskEmailService = require("../service/taskEmailerService");

cron.schedule("0 * * * *", async () => {
    console.log("Running scheduled deadline check...");
    await taskEmailService.checkDeadlines();
});
