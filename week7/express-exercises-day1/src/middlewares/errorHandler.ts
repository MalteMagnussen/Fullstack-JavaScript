import { NextFunction, Response } from "express";
const debug = require("debug")("game-project");

const noPath = (
  err: any, // Using Error here can give issues according to teacher
  req: any,
  res: Response,
  next: NextFunction
) => {
  debug(err.stack);
  err.message = "Path doesn't exist.";
  res.status(404).send("Path doesnt exist.!");

  // next(err);
};

function allErrors(
  err: any, // Using Error here can give issues according to teacher
  req: any,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
}

export { allErrors, noPath };
