require("dotenv").config();
import Express from "express";
import path from "path";

// EXPRESS
const app = Express();

app.use(Express.static(path.join(process.cwd(), "public")));
app.use(Express.json());

// LOGGER - THIS MAKES SENSE BEFORE ROUTER
const logger = require("./middlewares/logger.ts");
app.use(logger());

// CORS - DUNNO IF BEFORE OR AFTER ROUTER, I THINK BEFORE
const CORS = require("./middlewares/my-cors");
app.use(CORS());

// I THINK THIS IS MY ROUTER?????? ENDPOINTS
const userAPIRouter = require("./routes/userApi");
app.use("/api/users", userAPIRouter);

// ERRORLOGGER MAKES SENSE AFTER ROUTER
const errorLogger = require("./middlewares/errorLogger.ts");
app.use(errorLogger);

// CREATE ERRORHANDLER BELOW THIS COMMENT

// PORT
const PORT = process.env.PORT || 3333;

// START SERVER
const server = app.listen(PORT, () => {
  console.log(`Server started, listening on port: ${PORT}`);
});

module.exports.server = server;
