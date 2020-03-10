import { NextFunction } from "express";

const winston = require("winston"),
  expressWinston = require("express-winston");

// Logger configuration
export default function myLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
  const logger = expressWinston.errorLogger(logConfiguration);
  //   // Log a message
  //   logger.info(JSON.stringify(req));
  next();
}
