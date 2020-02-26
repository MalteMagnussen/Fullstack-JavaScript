const logger = (a: number, b: string) => {
  console.log(`Value 1: ${a}, Value 2: ${b}`);
};

let a = 12;
let b = "Hello World";

// logger(a, b);

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
// loggerV2(person, address);

class Person implements IPerson {
  constructor(private _name: string) {}
  get name() {
    return this._name;
  }
  set name(val: string) {
    this._name = val;
  }
}

let p = new Person("Kurt Wonnegut");

p.name = "Hanne Wonnegut";

// loggerV2(p, address);

const loggerV3 = <T, U>(a: T, b: U) => {
  console.log(`Person: ${JSON.stringify(a)}, 
  Address: ${JSON.stringify(b)}`);
};

// loggerV3(a, b);

class GenericLogger<T, U> {
  log = (a: T, b: U) =>
    console.log(`Val1: ${JSON.stringify(a)}, 
  Val2: ${JSON.stringify(b)}`);
}

const logger1 = new GenericLogger<number, string>();

const logger2 = new GenericLogger<IPerson, IAddress>();

logger1.log(a, b);
logger2.log(person, address);
