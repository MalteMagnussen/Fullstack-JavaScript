const crypto = require("crypto");
/*
c) Refactor your solution into a module and export it
Extra: You could refine what you have created as sketched below, to make it more reusable:

const getSecureRandoms = require("./ex1-crypto-module");

getSecureRandoms([48,40,32,24,16,8]) //any size and values ok, as long as integers
.then(randoms => console.log(randoms))
*/
const makeSecureRandom = size => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (error, buffer) => {
      let secureHex = buffer.toString("hex");
      resolve({
        length: secureHex.length,
        random: `A string with ${secureHex.length} random hex-characters`
      });
    });
  });
};

const getSecureRandoms = async sizeList => {
  const promises = [];
  for (let index = 0; index < sizeList.length; index++) {
    const element = await makeSecureRandom(sizeList[index]);
    console.log(element);
    promises.push(element);
  }
  return await Promise.all(promises);
};

module.exports = getSecureRandoms;
