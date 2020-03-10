const myLogger = (req, res, next) => {
  console.log(
    `Time: ${Date.now()} and Method: ${req.method} and URL: ${req.originalUrl}`
  );
  next();
};

export default myLogger;
