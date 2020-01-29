const fs = require("fs");

const path = process.argv[2];

const buffer = fs.readFileSync(path);

const str = buffer.toString();

const array = str.split("\n");

console.log(array.length - 1);

// fs.readFileSync(process.argv[2], 'utf8').split('\n').length -1
