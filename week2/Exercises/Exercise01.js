// 1) Simple OS-info file
// Create a javascript file that,
// using nodes CommonJS module system (require/exports),
// will export an object with the following info (demonstrated for a Window PC)
// {
//   platform: 'win32',
//   osType: 'Windows_NT',
//   freeMemory: 1244311552,
//   totalMemory: 8251834368,
//   EOL: '\r\n'
// }
// Create a simple test file that should import (require)
// the object and print it in a console.log-statement

// os.platform == "win32?"

const os = require("os");

const sysInfo = () => {
  const myObj = {
    platform: os.platform(),
    osType: os.type(),
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
    EOL: os.EOL
  };
  return myObj;
};

module.exports.sysInfo = sysInfo;
