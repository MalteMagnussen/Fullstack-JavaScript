const fs = require("fs");

fs.readFile(process.argv[2], "utf8", (err, data) => {
  if (err) {
  } else {
    console.log(data.split("\n").length - 1);
  }
});

// function readFile(path: string | number | Buffer | URL, options: {
//     encoding?: null;
//     flag?: string;
//     }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void (+3 overloads)
