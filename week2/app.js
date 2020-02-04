// () = (exports, require, module, __filename, __dirname) {}

console.log(__filename);
console.log(__dirname);

const log = require("./logger"); // .js not needed. Node automatically adds it

// console.log(module);
// console.log(logger);

log("message");
