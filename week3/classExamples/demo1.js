const promiseDemo = (msg, delay, makeError) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const err = Math.random() * 10 < 10;
      if (makeError && err) {
        return reject(new Error("UPPPS"));
      }
      return resolve(msg.toUpperCase());
    }, delay);
  });

const pd1 = promiseDemo("Hej Class", 1000, false);
pd1
  .then(data => console.log(data))
  .catch(error => console.log(error.message))
  .finally(() => console.log("Done."));

// Or

const test = async () => {
  try {
    const data = await promiseDemo("Hello Again", 1000, false);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Done.");
  }
};

test();
