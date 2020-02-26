let http = require("http");

// Interfaces 1
// a)
interface IBook {
  title: string;
  readonly author: string;
  published?: Date;
  pages?: number;
}

// b)
const printBook = (book: IBook) => {
  console.log(JSON.stringify(book));
};

const makeFullBook = (
  title: string,
  author: string,
  published: Date,
  pages: number
) => {
  return {
    title: title,
    author: author,
    published: published,
    pages: pages
  };
};

const myBook = makeFullBook(
  "Moby-Dick",
  "Herman Melville",
  new Date("1851-10-18"),
  927
);

// c)
// This is ducktyping.
// myBook is just an object Object.
// but because the object fits the IBook interface,
// the object is then accepted by printBook
console.log("Full Book");
printBook(myBook);

const optionalBook: IBook = {
  title: "Moby- Dick",
  author: "Herman Melville"
};

// d)
console.log("\nOptional: ");
printBook(optionalBook);

// e)
// Following doesnt work since author is readonly
// console.log("\nreadonly: ");
// optionalBook.author = "Malte Magnussen";
// printBook(optionalBook);
