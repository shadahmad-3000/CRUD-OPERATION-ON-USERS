const moment = require("moment");

const curr = moment().format("YYYY-MM-DD HH:mm:ss");
const date = moment().toDate();

console.log(curr)
console.log(date)