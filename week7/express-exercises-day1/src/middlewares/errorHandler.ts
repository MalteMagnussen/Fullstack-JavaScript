import { NextFunction, Response, Request } from "express";

const noPath = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(404).send("Path doesnt exist.!");
};

module.exports.noPath = noPath;

function allErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500);
  res.render("error", { error: err });
}

module.exports.allErrors = allErrors;
