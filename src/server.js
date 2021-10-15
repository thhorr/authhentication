const app = require("./index");
const connect = require("./configs/db");

app.listen(9999, async function () {
  await connect();
  console.log("Jaarvis");
});
