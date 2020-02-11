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

const results = [];

myPromise("Number 1", 2000)
  .then(msg => {
    results.push(msg);
    return myPromise("Number 2", 1000);
  })
  .then(msg => {
    results.push(msg);
    // throw new Error("Ups")
    return myPromise("Number 3", 500);
  })
  .then(res => results.push(res))
  .catch(err => console.log("In Catch", err))
  .finally(() => console.log(results.join(", ")));
