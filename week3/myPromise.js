var myPromise = (txt, delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple errohandling example in 4 lines below.
      // const err = true;
      // if (err) {
      //     return reject(new Error("Ups"))
      // }
      resolve("Hello" + txt);
    }, delay);
  });

module.exports = myPromise;
