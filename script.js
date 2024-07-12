const myLibrary = []

// main
const addBookButton = document.getElementById("add-book-button") // plus
const addBookDialog = document.getElementById("add-book-dialog") // dialog
const books = document.getElementById("books")

// dialog
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const totalPages = document.getElementById('total-pages').value;
const currentPage = document.getElementById('current-page').value;

const bookReadCheck = document.getElementById('read');
const bookNotReadCheck = document.getElementById('not-read');

const cancel = document.getElementById("cancel")
const addBookSubmit = document.getElementById("add-book-submit") // dialog submit button

// books
const addButtonCurrentPage = document.querySelectorAll(".book-page-plus")

function Book(title, author, currentPage, totalPages) {
    this.title = title;
    this.author = author;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.isRead = isReadYet(currentPage, totalPages)
}

function printBook(book) {
    console.log(`title: ${book.title}\nauthor: ${book.author}\ncurrent pages: ${book.currentPage}\ntotal pages: ${book.totalPages}`);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function isReadYet (pagesRead, totalPages) {
    return pagesRead === totalPages;
}

// dialog

function createBookObject() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const totalPages = document.getElementById('total-pages').value;
    const currentPage = document.getElementById('current-page').value;

    validateInput();

    const newBook = new Book(title, author, currentPage, totalPages);

    addBookToLibrary(newBook);
    deleteAllBooks();
    addBookToBooks(myLibrary);


    
    clearAllInputFields();
    console.log(myLibrary);
}



function isBookRead() {
    const currentPage = document.getElementById('current-page');

    if (bookReadCheck.checked) {
        currentPage.disabled = true;
        currentPage.placeholder = '';

    } else if (bookNotReadCheck.checked) {
        currentPage.disabled = false;
        currentPage.placeholder = '63';

    }
}

function validateInput() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const totalPages = document.getElementById('total-pages').value;
    const currentPage = document.getElementById('current-page').value;

    if (!title) {
        alert('Title is required.');
        return;
    }
    if (!author) {
        alert('Author is required.');
        return;
    }
    if (!totalPages) {
        alert('Total pages is required.');
        return;
    }
    if (!currentPage && document.getElementById('current-page').disabled === false) {
        alert('Current page is required.');
        return;
    }

}

function clearAllInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('total-pages').value = '';
    document.getElementById('current-page').value = '';
}

function createBookContainer(newBook, index) {
    const book = document.createElement("div");

    const header = document.createElement("div");
    const h3 = document.createElement("h3");
    const buttonXMark = document.createElement("button");
    const iXMark = document.createElement("i");

    const bookAuthor = document.createElement("div");

    // pages section
    const bookPages = document.createElement("div");

    const bookPageMinus = document.createElement("button");
    const iMinus = document.createElement("i");

    const pageStatus = document.createElement("div");
    const pageStart = document.createElement("span");
    const slash = document.createElement("span");
    const pageEnd = document.createElement("span");

    const bookPagePlus = document.createElement("button");
    const iPlus = document.createElement("i");

    const bookRead = document.createElement("div");

    // button container
    const buttonContainer = document.createElement("div");
    const buttonEdit = document.createElement("button");
    const iEdit = document.createElement("i");
    const buttonMark = document.createElement("button");
    const iMark = document.createElement("i");


    book.classList.add("book");
    book.setAttribute("data-index", index);
    header.classList.add("header");
    h3.classList.add("book-title");
    buttonXMark.classList.add("xmark");
    iXMark.classList.add("fa-solid", "fa-circle-xmark");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-pages");
    bookPageMinus.classList.add("book-page-minus");
    iMinus.classList.add("fa-regular", "fa-square-minus")
    pageStatus.classList.add("page-status");
    pageStart.classList.add("page-start");
    pageEnd.classList.add("page-end");
    bookPagePlus.classList.add("book-page-plus");
    iPlus.classList.add("fa-regular", "fa-square-plus");
    buttonContainer.classList.add("button-container");
    buttonEdit.classList.add("edit");
    iEdit.classList.add("fa-regular", "fa-pen-to-square");
    buttonMark.classList.add("mark");
    iMark.classList.add("fa-regular", "fa-envelope");
    

    h3.textContent = newBook.title;
    bookAuthor.textContent = newBook.author;
    pageStart.textContent = newBook.currentPage;
    slash.textContent = '/';
    pageEnd.textContent = newBook.totalPages;
    bookRead.textContent = "pages read";


    buttonEdit.appendChild(iEdit);
    buttonMark.appendChild(iMark);
    buttonContainer.appendChild(buttonEdit);
    buttonContainer.appendChild(buttonMark);

    pageStatus.appendChild(pageStart);
    pageStatus.appendChild(slash);
    pageStatus.appendChild(pageEnd);

    bookPageMinus.appendChild(iMinus);
    bookPagePlus.appendChild(iPlus);
    buttonXMark.appendChild(iXMark);

    bookPages.appendChild(bookPageMinus);
    bookPages.appendChild(pageStatus);
    bookPages.appendChild(bookPagePlus);
    bookPages.appendChild(bookRead);

    header.appendChild(h3);
    header.appendChild(buttonXMark);

    book.appendChild(header);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(buttonContainer);

    books.appendChild(book);

}

function addBookToBooks(myLibrary) {
    for (let i = 0; i < myLibrary.length; i++) {
        createBookContainer(myLibrary[i], i);
    }
}

function incrementCurrentPage(index) {
    myLibrary[index].currentPage++;
}

function decrementCurrentPage(index) {
    myLibrary[index].currentPage--;
}

// Event Listeners

function deleteAllBooks() {
    while(books.firstChild) {
        books.removeChild(books.firstChild);
    }
}


addBookButton.addEventListener("click", () => {
    
    addBookDialog.showModal();
})

cancel.addEventListener("click", () => {
    addBookDialog.close();
})


addBookSubmit.addEventListener("click", () => {
    createBookObject();
    addBookDialog.close();
})

bookReadCheck.addEventListener("click", isBookRead);

bookNotReadCheck.addEventListener("click", isBookRead);


books.addEventListener("click", function(event) {

    if (event.target.classList.contains("fa-square-plus")) {

        const book = event.target.closest(".book");

        if (book) {
            const index = book.getAttribute("data-index") ;
            if (index !== null) {
                const pageStart = book.querySelector(".page-start");
                let currentPage = parseInt(pageStart.textContent, 10);
                currentPage++;

                pageStart.textContent = currentPage;
                console.log("yes3");
                incrementCurrentPage(index);
                console.log(myLibrary);

            }
        }
    
    } else if (event.target.classList.contains("fa-square-minus")) {
        const book = event.target.closest(".book");

        if (book) {
            const index = book.getAttribute("data-index") ;
            if (index !== null) {
                const pageStart = book.querySelector(".page-start");
                let currentPage = parseInt(pageStart.textContent, 10);
                currentPage--;

                pageStart.textContent = currentPage;
                console.log("yes3");
                decrementCurrentPage(index);
                console.log(myLibrary);
            }
        }
    }
})