const bookDisplay = document.querySelector(".book-display");
const newBookButton = document.querySelector(".new-book-button");
const newBookForm = document.getElementById("new-book-form");
const addBookButton = document.getElementById("add-book");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const notReadInput = document.getElementById("not-read");
const bookFormElements = document.querySelector(".book-form-elements");

let myLibrary = [];

function Book(title, author, pages, readStatus, idNumber) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.idNumber = idNumber;
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Read', `book-entry-0`);

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

addBookToLibrary(book1);

function removeButton() {
    const removeBookButton = document.createElement('button');
    removeBookButton.setAttribute("type", "button");
    removeBookButton.setAttribute("class", "remove-button");
    removeBookButton.innerText = "Remove"; 
    return removeBookButton;
}

function editStatusButton() {
    const editReadStatus = document.createElement('button');
    editReadStatus.setAttribute("type", "button");
    editReadStatus.setAttribute("class", "edit-readstatus-button");
    editReadStatus.innerText = "Read Status"; 
    return editReadStatus;
}

function books() {
    for (i = 0; i < myLibrary.length; i++) { 
        let bookTitleDiv = document.createElement('div');
        bookTitleDiv.setAttribute("class", `${myLibrary[i].idNumber}`);
        bookTitleDiv.style.fontWeight = "bold";
        bookTitleDiv.innerText = `${myLibrary[i].title}`;

        let bookInfoDiv = document.createElement('div');
        bookInfoDiv.setAttribute("class", "book-information", `${myLibrary[i].idNumber}`);
        bookInfoDiv.innerText = `\n by ${myLibrary[i].author} \n ${myLibrary[i].pages} pages \n ${myLibrary[i].readStatus}`;
        bookDisplay.appendChild(bookInfoDiv);  
        bookInfoDiv.prepend(bookTitleDiv);
        
        let bookTarget = myLibrary[i]; 
        const removeBookButton = removeButton();
        bookInfoDiv.appendChild(removeBookButton);
        removeBookButton.addEventListener("click", function() {
            bookInfoDiv.remove();
            for (i = 0; i < myLibrary.length; i++) {
                myLibrary.splice(i, 1);
            }
        });

        if (bookTarget.readStatus == "Not Read Yet") {
            bookInfoDiv.classList.add("low-opacity");
        } else bookInfoDiv.classList.remove("low-opacity");

        const editReadStatusButton = editStatusButton();
        bookInfoDiv.appendChild(editReadStatusButton);
        editReadStatusButton.addEventListener("click", function() {
            if (bookTarget.readStatus == "Read") {
                bookTarget.readStatus = "Not Read Yet";
                bookInfoDiv.classList.add("low-opacity");
                bookTarget.toggleNotRead();
            } else {
                bookInfoDiv.classList.remove("low-opacity");
                bookTarget.readStatus = "Read";
                bookTarget.toggleRead();
            }
            bookTitleDiv.innerText = `${bookTarget.title}`;
            bookInfoDiv.innerText = `\n by ${bookTarget.author} \n ${bookTarget.pages} pages \n ${bookTarget.readStatus}`;
            bookInfoDiv.prepend(bookTitleDiv);
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
        bookFormElements.classList.add("add-book-open");
        newBookButton.classList.add("add-book-button-open");
        newBookButton.innerText = "X";  
        document.body.style.flexDirection = "row";
         
    } else {
        newBookForm.style.display = "none";
        bookFormElements.classList.remove("add-book-open");
        newBookButton.classList.remove("add-book-button-open");
        newBookButton.innerText = "Add Book";
        document.body.style.flexDirection = "column";

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



