"use strict";
let http = require("http");
const printBook = (book) => {
    console.log(JSON.stringify(book));
};
const makeBook = (title, author, published, pages) => {
    return {
        title: title,
        author: author,
        published: published,
        pages: pages
    };
};
const myBook = makeBook("Moby-Dick", "Herman Melville", new Date("1851-10-18"), 927);
// This is ducktyping.
// myBook is just an object Object.
// but because the object fits the IBook interface,
// the object is then accepted by printBook
printBook(myBook);
//# sourceMappingURL=first.js.map