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

// a) First implement the functionality without promises, using callbacks.

// Hint: You don't have to complete this implementation,
// but implement it for the first 2-3 numbers so you have an example of the "pyramid of doom".
// Also consider the code if you were asked to produce 100 randoms ;-)
const myObj = {
  title: "6 Secure Randoms",
  randoms: []
};

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
// a done

// b) Use Promises to solve the problem.
// Hints:
// Create a function makeSecureRandom(size) that returns a promise,
// using the callback based design,provided by the randomBytes(..) method.
// Since the result from one calculation does not influence the next (only order matters),
// use Promise.all(..) to execute the operations in parallel.

const makeSecureRandom = size =>
  new Promise((resolve, reject) => {
    let random;
    crypto.randomBytes(size, (error, buffer) => {
      let secureHex = buffer.toString("hex");
      random = {
        length: secureHex.length,
        random: `A string with ${secureHex.length} random hex-characters`
      };
    });
    if (random) {
      resolve(random);
    } else {
      reject("Something went wrong.");
    }
  });

const getSecureRandoms = async sizeList => {
  const promises = [];

  for (let index = 0; index < sizeList.length; index++) {
    const element = makeSecureRandom(sizeList[index]);
    promises.push(element);
  }

  const all = await Promise.all(promises);

  return all;
};
