const args = process.argv;

let sum = 0;

for (let index = 0; index < args.length; index++) {
  const element = args[index];
  if (index >= 2) {
    sum += Number(element);
  }
}

console.log(sum);
