const getSecureRandoms = require("./getSecureRandoms");

getSecureRandoms([24, 20, 16, 12, 8, 4]) //any size and values ok, as long as integers
  .then(randoms => console.log(randoms));

(async () => {
  const randoms = await getSecureRandoms([24, 20, 16, 12, 8, 4]);
  console.log(randoms);
})();
