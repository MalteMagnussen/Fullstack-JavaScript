const crypto = require("crypto");

// 1 Wrap a callback implementation in a promise based implementation
// As you have seen, promises are much more convenient to use, compared to asynchronous callbacks.
// And with async/await you will think of asynchronous callbacks as “ludicrous”.
// In this exercise you must wrap a callback based design, in a promise,
// so you can use it with the .then notation and also with async/await
// In this exercise you must create a design to produce an object with 6 secure randoms as sketched below:
// {
//   "title": "6 Secure Randoms",
//   "randoms": [
//     {"length": 48,"random": "A string with 48 random hex-characters"},
//     {"length": 40,"random": "A string with 40 random hex-characters"},
//     {"length": 32,"random": "A string with 32 random hex-characters"},
//     {"length": 24,"random": "A string with 24 random hex-characters"},
//     {"length": 16,"random": "A string with 16 random hex-characters"},
//     {"length": 8,"random":  "A string with 8 random hex-characters"}
//   ]
// }

// The 6 strings must be presented in the order given above.

// You must use Nodes built in crypto module,
// as sketched below (the asynchronous version of the function):
// const SIZE = 48;

// crypto.randomBytes(SIZE, function(err, buffer) {
//   let secureHex = buffer.toString("hex");
//   console.log("Should be 8 long: " + secureHex + " 8 long end. ");
// });

// // async
// crypto.randomBytes(256, function(ex, buf) {
//   if (ex) throw ex;
//   console.log("Have %d bytes of random data: %s", buf.length, buf);
// });

// // sync
// try {
//   var buf = crypto.randomBytes(256);
//   console.log("Have %d bytes of random data: %s", buf.length, buf);
// } catch (ex) {
//   // handle error
//   // most likely, entropy sources are drained
// }

// a) First implement the functionality without promises, using callbacks.

// Hint: You don't have to complete this implementation,
// but implement it for the first 2-3 numbers so you have an example of the "pyramid of doom".
// Also consider the code if you were asked to produce 100 randoms ;-)
const myObj = {
  title: "6 Secure Randoms",
  randoms: []
};
// const randomExample = {
//   length: 48,
//   random: "A string with 48 random hex-characters"
// };

const size = 24;
crypto.randomBytes(size, (error, buffer) => {
  let secureHex = buffer.toString("hex");
  myObj.randoms.push({
    length: secureHex.length,
    random: `A string with ${secureHex.length} random hex-characters`
  });
  crypto.randomBytes(size - 4, (error, buffer) => {
    let secureHex = buffer.toString("hex");
    myObj.randoms.push({
      length: secureHex.length,
      random: `A string with ${secureHex.length} random hex-characters`
    });
    crypto.randomBytes(size - 8, (error, buffer) => {
      let secureHex = buffer.toString("hex");
      myObj.randoms.push({
        length: secureHex.length,
        random: `A string with ${secureHex.length} random hex-characters`
      });
      console.log(JSON.stringify(myObj, null, 4));
    });
  });
});
