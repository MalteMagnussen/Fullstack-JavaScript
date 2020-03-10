require("dotenv").config();
import Express from "express";
import path from "path";

// EXPRESS
const app = Express();

app.use(Express.static(path.join(process.cwd(), "public")));
app.use(Express.json());

// const logger = require("./middlewares/firstLogger.ts");
// app.use(logger());

// LOGGER
const logger = require("./middlewares/logger.ts");

app.use(logger());

// CORS
const CORS = require("./middlewares/my-cors");

app.use(CORS());

// ROUTER?????? ENDPOINTS
let userAPIRouter = require("./routes/userApi");

app.use("/api/users", userAPIRouter);

// ERRORLOGGER
const errorLogger = require("./middlewares/errorLogger.ts");
app.use(errorLogger);

// DUMMY
app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" });
});

// PORT
const PORT = process.env.PORT || 3333;

// START SERVER
const server = app.listen(PORT, () => {
  console.log(`Server started, listening on port: ${PORT}`);
});

module.exports.server = server;
