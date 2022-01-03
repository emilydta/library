const bookDisplay = document.querySelector(".book-display");
const addBookButton = document.getElementById("add-book-button");
const newBookForm = document.getElementById("new-book-form");

let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
const book2 = new Book('Blah', 'Bdsf', '222 pages', 'not read yet');

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

addBookToLibrary(book1);
addBookToLibrary(book2);

function books() {
    for (i = 0; i < myLibrary.length; i++) { 
        bookInfo = document.createElement('div');
        bookDisplay.appendChild(bookInfo);
        bookInfo.setAttribute("class", "book-information");
        bookInfo.innerText = `${myLibrary[i].title} \n by ${myLibrary[i].author} \n ${myLibrary[i].pages} \n ${myLibrary[i].readStatus}`; 
    }
}

books();

function addBookButtonFunction() {
    
}

addBookButton.addEventListener("click", () => addBookButtonFunction)