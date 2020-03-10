const corsHeaders = (req, res, next) => {
  // Add required CORS-Headers.
  res.header("Access-Control-Allow-Origin", "*"); // All origins allowed.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Feel free to use whatever you feel you need.
  next();
};

export default corsHeaders;
