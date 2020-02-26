const logger = (a: number, b: string) => {
  console.log(`Value 1: ${a}, Value 2: ${b}`);
};

let a = 12;
let b = "Hello World";

logger(a, b);

interface IPerson {
  name: string;
}
interface IAddress {
  address: string;
}

const loggerV2 = (a: IPerson, b: IAddress) => {
  console.log(`Name of Person: ${JSON.stringify(a)}, Address: ${b.address}`);
};

const person: IPerson = { name: "Kurt" };
const address: IAddress = { address: "123 Main St" };
loggerV2(person, address);
