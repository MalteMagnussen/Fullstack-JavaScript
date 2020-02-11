const getSecureRandoms = require("./getSecureRandoms");

getSecureRandoms([48, 40, 32, 24, 16, 8]) //any size and values ok, as long as integers
  .then(randoms => console.log(randoms));
