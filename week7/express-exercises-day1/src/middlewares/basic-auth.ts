var http = require("http");
var auth = require("basic-auth");
var compare = require("tsscmp");
import { Response, NextFunction } from "express";
import UserFacade from "../facades/user";

const debug = require("debug")("game-project");

// Create server
const authMiddleware = async function(
  req: any,
  res: Response,
  next: NextFunction
) {
  var credentials = auth(req);

  try {
    if (
      /*IF LOGGED IN*/ credentials ||
      (await UserFacade.checkUser(credentials.name, credentials.password))
    ) {
      const user = await UserFacade.getUser(credentials.name);
      req.userName = user.userName;
      req.role = user.role;
      return next();
    }
  } catch (e) {}

  // IF NOT LOGGED IN
  res.statusCode = 401;
  res.setHeader("WWW-Authenticate", 'Basic realm="example"');
  debug("authMiddleware error");
  res.end("Access denied");
};
export default authMiddleware;
