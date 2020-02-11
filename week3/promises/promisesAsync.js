// Example from https://youtu.be/DHD72FQmcWo

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

const p3 = myPromise("Number 3", 2000);
const p2 = myPromise("Number 2", 2000);
const p1 = myPromise("Number 1", 2000);
const promises = [p1, p2, p3];
Promise.all(promises)
  .then(d => console.log(d.join(", ")))
  .catch(err => console.log("Ups"));
