import { NextFunction, Response } from "express";
const debug = require("debug")("game-project");

// const noPath = (
//   err: any, // Using Error here can give issues according to teacher
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   debug("noPath error");
//   debug(err.stack);
//   err.message = "Path doesn't exist.";
//   res.status(404).send("Path doesnt exist.!");

//   // next(err);
// };

function allErrors(
  err: any, // Using Error here can give issues according to teacher
  req: any,
  res: Response,
  next: NextFunction
) {
  debug("allErrors error");
  res.status(err.status || 500);
  res.json({ message: err.msg, name: err.name, error: err });
}

export { allErrors }; //, noPath
