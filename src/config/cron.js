const CronJob = require("cron").CronJob;

new CronJob({
  cronTime: "00 * * * * *",
  onTick: async () => {},
  start: false,
  runOnInit: false
});
