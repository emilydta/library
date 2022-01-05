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

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet', `book-entry-0`);
const book2 = new Book('Blah', 'Bdsf', '222', 'not read yet', 'book-entry-1');

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

addBookToLibrary(book1);
addBookToLibrary(book2);

function books() {
    for (i = 0; i < myLibrary.length; i++) { 
        bookInfoDiv = document.createElement('div');
        bookDisplay.appendChild(bookInfoDiv);
        bookInfoDiv.setAttribute("class", "book-information");
        bookInfoDiv.setAttribute("id", `book-entry-${i}`);
        bookInfoDiv.innerText = `${myLibrary[i].title} \n by ${myLibrary[i].author} \n ${myLibrary[i].pages} pages \n ${myLibrary[i].readStatus}`; 
        
        removeBook = document.createElement('button');
        bookInfoDiv.appendChild(removeBook);
        removeBook.setAttribute("type", "button");
        //removeBook.setAttribute("id", `${myLibrary[i].idNumber}`)
        removeBook.innerText = "Remove"; 
    
       
    

        const bookId = document.getElementById(`book-entry-${i}`);
        let removeObjectFromLibrary = myLibrary[i].idNumber;

        console.log(i);
        removeBook.addEventListener("click", function() {
            bookId.remove();
            for (i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].idNumber == removeObjectFromLibrary) {
                    myLibrary.splice(i, 1);
                }
            }
            
        });
}}

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

function addBookButtonFunction() {
    if (!titleInput.value || !authorInput.value || !pagesInput.value || !readInput.checked && !notReadInput.checked) {
        return alert ("Please fill out all fields");
    } else {
        let bookIdNumber = + new Date();
        let customBook = new Book(`${titleInput.value}`, `${authorInput.value}`, `${pagesInput.value}`, `${readStatusInputChecker()}`, `${bookIdNumber}`);
        addBookToLibrary(customBook);
        removeAllBooks();
        books();
        newBookForm.reset();
    }
}

newBookButton.addEventListener("click", showForm);
addBookButton.addEventListener("click", addBookButtonFunction)



