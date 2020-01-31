const fs = require("fs");
const path = require("path");

/*
path.extname('index.html');
// Returns: '.html'
*/

// fs.readFileSync(process.argv[2], 'utf8').split('\n').length -1

fs.readdir(process.argv[2], "utf8", (err, data) => {
  if (err) {
  } else {
    data.forEach(element => {
      const str = path.extname(element);
      const ending = str.substr(1);
      if (process.argv[3] == ending) {
        console.log(element);
      }
    });
  }
});

// function readFile(path: string | number | Buffer | URL, options: {
//     encoding?: null;
//     flag?: string;
//     }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void (+3 overloads)
