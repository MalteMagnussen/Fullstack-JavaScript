const getFileNames = require("./mymodule.js");

const myCallback = (err, data) => {
  if (err) {
    console.log("An error occurred: " + err);
  } else {
    data.forEach(element => {
      console.log(element);
    });
  }
};

getFileNames(process.argv[2], process.argv[3], myCallback);
