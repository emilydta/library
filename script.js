function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function() {
        return `${title} ${author} ${pages} ${readStatus}`;
    }
}

const book1 = new Book('The Hobbit', 'by J.R.R. Tolkien', '295 pages', 'not read yet');
console.log(book1.info());