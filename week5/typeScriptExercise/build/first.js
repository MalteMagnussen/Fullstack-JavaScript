"use strict";
let http = require("http");
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
console.log("\nOptional: ");
printBook(optionalBook);
console.log("\nreadonly: ");
optionalBook.author = "Malte Magnussen";
printBook(optionalBook);
//# sourceMappingURL=first.js.map