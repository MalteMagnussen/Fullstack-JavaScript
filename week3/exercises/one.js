const crypto = require("crypto");

const myObj = {
  title: "6 Secure Randoms",
  randoms: []
};

const size = 24;
crypto.randomBytes(size, (error, buffer) => {
  let secureHex = buffer.toString("hex");
  myObj.randoms.push({
    length: secureHex.length,
    random: secureHex
  });
  crypto.randomBytes(size - 4, (error, buffer) => {
    let secureHex = buffer.toString("hex");
    myObj.randoms.push({
      length: secureHex.length,
      random: secureHex
    });
    crypto.randomBytes(size - 8, (error, buffer) => {
      let secureHex = buffer.toString("hex");
      myObj.randoms.push({
        length: secureHex.length,
        random: secureHex
      });
      console.log(JSON.stringify(myObj, null, 4));
    });
  });
});
