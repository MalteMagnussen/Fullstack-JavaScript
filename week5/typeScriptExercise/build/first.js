"use strict";
let http = require("http");
class Book {
    constructor(_title, _author, _published, _pages) {
        this._title = _title;
        this._author = _author;
        this._published = _published;
        this._pages = _pages;
    }
    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }
    // setAuthor(author:string) {this._author = author} // Can't do this on readonly
    get author() {
        return this._author;
    }
    set published(published) {
        this._published = published;
    }
    get published() {
        return this._published;
    }
    set pages(pages) {
        this._pages = pages;
    }
    get pages() {
        return this._pages;
    }
}
// b)
const printBook = (book) => {
    console.log(JSON.stringify(book));
};
const makeFullBook = (title, author, published, pages) => {
    return {
        title: title,
        author: author,
        published: published,
        pages: pages
    };
};
const myBook = makeFullBook("Moby-Dick", "Herman Melville", new Date("1851-10-18"), 927);
// c)
// This is ducktyping.
// myBook is just an object Object.
// but because the object fits the IBook interface,
// the object is then accepted by printBook
console.log("Full Book");
printBook(myBook);
const optionalBook = {
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
//# sourceMappingURL=first.js.map