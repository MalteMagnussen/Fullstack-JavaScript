require("dotenv").config();
import Express from "express";
import path from "path";

// EXPRESS
const app = Express();

app.use(Express.static(path.join(process.cwd(), "public")));
app.use(Express.json());

// LOGGER - THIS MAKES SENSE BEFORE ROUTER
// import { myLogger } from "./middlewares/logger";
// app.use(myLogger);
import { requestLogger } from "./middlewares/larsLogger";
app.use(requestLogger);

// CORS - DUNNO IF BEFORE OR AFTER ROUTER, I THINK BEFORE
// const CORS = require("./middlewares/my-cors");
// app.use(CORS());
const cors = require("cors");
app.use(cors());

// I THINK THIS IS MY ROUTER?????? ENDPOINTS
import { userAPIRouter } from "./routes/userApi";
app.use("/api/users", userAPIRouter);

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" });
});

// ERRORLOGGER MAKES SENSE AFTER ROUTER
// import { errorLogger } from "./middlewares/errorLogger";
// app.use(errorLogger);
import { errorLogger } from "./middlewares/larsLogger";
app.use(errorLogger);

// CREATE ERRORHANDLER BELOW THIS COMMENT
// ERRORHANDLER SHOULD BE LAST THING
// I have no idea how either logging or error handling works
import { allErrors } from "./middlewares/errorHandler"; //noPath,
app.use(function(err: any, req: any, res: any, next: Function) {
  if (err.name === "ApiError") {
    res.status(400).json({ code: err.errorCode, message: err.message });
  }
  next(err);
});
// // 404 wrong path
// app.use(noPath);
// Then everything else
// app.use(allErrors);

// PORT
const PORT = process.env.PORT || 3333;

// START SERVER
const server = app.listen(PORT, () => {
  console.log(`Server started, listening on port: ${PORT}`);
});

module.exports.server = server;
