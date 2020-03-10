require("dotenv").config();
import Express from "express";
import path from "path";

const app = Express();

app.use(Express.static(path.join(process.cwd(), "public")));
app.use(Express.json());
let userAPIRouter = require("./routes/userApi");

app.use("/api/users", userAPIRouter);

const logger = require("./middlewares/firstLogger.ts");

app.use(logger());

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" });
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
