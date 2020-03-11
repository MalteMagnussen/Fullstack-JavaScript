const fs = require("fs");
const path = require("path");

const getFileNames = (
  directoryName: string,
  filenameExtension: string,
  callbackFunction: Function
) => {
  fs.readdir(directoryName, "utf8", (err: any, data: any) => {
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

      data = data.filter((element: any) => {
        return path.extname(element) === "." + filenameExtension;
      });
      callbackFunction(null, data);
    }
  });
};

export { getFileNames };
