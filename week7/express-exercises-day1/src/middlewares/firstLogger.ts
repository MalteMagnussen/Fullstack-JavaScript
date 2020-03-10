import { NextFunction, Response } from "express";

const myLogger = (req: any, res: Response, next: NextFunction) => {
  console.log(
    `Time: ${Date.now()} and Method: ${req.method} and URL: ${req.originalUrl}`
  );
  next();
};

export default myLogger;
