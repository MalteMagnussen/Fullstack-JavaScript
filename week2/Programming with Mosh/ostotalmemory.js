const os = require("os");

const totalMemory = os.totalmem();

const freeMemory = os.freemem();

// console.log("Total Memory: " + totalMemory);

// Template strings
// ECMAScript 6

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
