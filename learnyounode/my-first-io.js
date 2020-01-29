const fs = require("fs");

const path = process.argv[2];

const buffer = fs.readFileSync(path);

const str = buffer.toString();

const array = str.split("\n");

console.log(array.length - 1);
