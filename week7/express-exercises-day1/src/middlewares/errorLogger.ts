import { NextFunction, Response } from "express";

const winston = require("winston"),
  expressWinston = require("express-winston");

// Logger configuration
const errorLogger = (req: any, res: Response, next: NextFunction) => {
  const logConfiguration = {
    transports: [
      new winston.transports.File({
        filename: "../logs/error.log"
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  };
  // Create the logger
  expressWinston.errorLogger(logConfiguration);
  next();
};

export { errorLogger };
