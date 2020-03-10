import { NextFunction, Response } from "express";

const noPath = (
  err: any, // Using Error here can give issues according to teacher
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(404).send("Path doesnt exist.!");
};

function allErrors(
  err: any, // Using Error here can give issues according to teacher
  req: any,
  res: Response,
  next: NextFunction
) {
  res.status(500);
  res.render("error", { error: err });
}

export { allErrors, noPath };
