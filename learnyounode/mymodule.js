const fs = require("fs");
const path = require("path");

const getFileNames = (directoryName, filenameExtension, callbackFunction) => {
  fs.readdir(directoryName, "utf8", (err, data) => {
    if (err) {
      return callbackFunction(err);
    } else {
      //   let returnArray = [];
      //   data.forEach(element => {
      //     const str = path.extname(element);
      //     const ending = str.substr(1);
      //     if (filenameExtension == ending) {
      //       returnArray.push(element);
      //     }
      //   });

      data = data.filter(element => {
        return path.extname(element) === "." + filenameExtension;
      });
      callbackFunction(null, data);
    }
  });
};

module.exports = getFileNames;
