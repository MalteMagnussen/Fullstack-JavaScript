let http = require("http");

// Interfaces 1
// a)
interface IBook {
  title: string;
  readonly author: string;
  published?: Date;
  pages?: number;
}

class Book implements IBook {
  constructor(
    private _title: string,
    private readonly _author: string,
    private _published: Date,
    private _pages: number
  ) {}
  set title(title: string) {
    this._title = title;
  }
  get title() {
    return this._title;
  }

  // setAuthor(author:string) {this._author = author} // Can't do this on readonly
  get author() {
    return this._author;
  }

  set published(published: Date) {
    this._published = published;
  }
  get published() {
    return this._published;
  }

  set pages(pages: number) {
    this._pages = pages;
  }
  get pages() {
    return this._pages;
  }
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
