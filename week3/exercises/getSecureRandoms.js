const crypto = require("crypto");

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
    promises.push(element);
  }
  return await Promise.all(promises);
};

module.exports = getSecureRandoms;
