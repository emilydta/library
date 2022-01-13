const bookDisplay = document.querySelector(".book-display");
const newBookButton = document.getElementById("new-book-button");
const newBookForm = document.getElementById("new-book-form");
const addBookButton = document.getElementById("add-book");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const notReadInput = document.getElementById("not-read");

let myLibrary = [];

function Book(title, author, pages, readStatus, idNumber) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.idNumber = idNumber;
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Not Read Yet', `book-entry-0`);
const book2 = new Book('Blah', 'Bdsf', '222', 'Read', 'book-entry-1');

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

addBookToLibrary(book1);
addBookToLibrary(book2);

function removeButton() {
    const removeBookButton = document.createElement('button');
    removeBookButton.setAttribute("type", "button");
    removeBookButton.innerText = "Remove"; 
    return removeBookButton;
}

function editStatusButton() {
    const editReadStatus = document.createElement('button');
    editReadStatus.setAttribute("type", "button");
    editReadStatus.innerText = "Edit Read Status"; 
    return editReadStatus;
}

function books() {
    for (i = 0; i < myLibrary.length; i++) { 
        let bookInfoDiv = document.createElement('div');
        bookInfoDiv.setAttribute("class", "book-information");
        bookInfoDiv.setAttribute("id", `${myLibrary[i].idNumber}`);
        bookInfoDiv.innerText = `${myLibrary[i].title} \n by ${myLibrary[i].author} \n ${myLibrary[i].pages} pages \n ${myLibrary[i].readStatus}`;
        bookDisplay.appendChild(bookInfoDiv);
        let bookTarget = myLibrary[i]; 

        const removeBookButton = removeButton();
        bookInfoDiv.appendChild(removeBookButton);
        removeBookButton.addEventListener("click", function() {
            bookInfoDiv.remove();
            for (i = 0; i < myLibrary.length; i++) {
                myLibrary.splice(i, 1);
            }
        });
        const editReadStatusButton = editStatusButton();
        bookInfoDiv.appendChild(editReadStatusButton);
        editReadStatusButton.addEventListener("click", function() {
            if (bookTarget.readStatus == "Read") {
                bookTarget.readStatus = "Not Read Yet";
                bookTarget.toggleNotRead();
            } else bookTarget.toggleRead();
            bookInfoDiv.innerText = `${bookTarget.title} \n by ${bookTarget.author} \n ${bookTarget.pages} pages \n ${bookTarget.readStatus}`;
            bookInfoDiv.appendChild(removeBookButton);
            bookInfoDiv.appendChild(editReadStatusButton);
        });   
    };
}


Book.prototype.toggleRead = function() {       
    this.readStatus = "Read";
}

Book.prototype.toggleNotRead = function() {
    this.readStatus = "Not Read Yet";
}

books();

function showForm() {
    if (newBookForm.style.display === "none") {
        newBookForm.style.display = "block";
    } else {
        newBookForm.style.display = "none";
    }
}

function removeAllBooks() {
    const allBooks = document.querySelectorAll(".book-information");
    allBooks.forEach(book => {
        book.remove();
    });
}

function readStatusInputChecker() {
    if (readInput.checked) {
        return readInput.value;
    }
    if (notReadInput.checked) {
        return notReadInput.value;
    }
}

function newBookFunction() {
    let bookIdNumber = + new Date();
    let customBook = new Book(`${titleInput.value}`, `${authorInput.value}`, `${pagesInput.value}`, `${readStatusInputChecker()}`, `${bookIdNumber}`);
    return customBook;
}

function addBookButtonFunction() {
    if (!titleInput.value || !authorInput.value || !pagesInput.value || !readInput.checked && !notReadInput.checked) {
        return alert ("Please fill out all fields");
    } else {
        addBookToLibrary(newBookFunction());
        removeAllBooks();
        books();
        newBookForm.reset();
    }
}

newBookButton.addEventListener("click", showForm);
addBookButton.addEventListener("click", addBookButtonFunction)



