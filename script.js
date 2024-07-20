const myLibrary = [];
let currentIndex;

// main
const addBookButton = document.getElementById("add-book-button"); // plus
const addBookDialog = document.getElementById("add-book-dialog"); // dialog
const books = document.getElementById("books");

// dialog
const dialogTitle = document.getElementById("dialog-title");

const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const totalPages = document.getElementById('total-pages').value;
const currentPage = document.getElementById('current-page').value;

const bookReadCheck = document.getElementById('read');
const bookNotReadCheck = document.getElementById('not-read');

const cancel = document.getElementById("cancel");
const addBookSubmit = document.getElementById("add-book-submit"); // dialog submit button

// books

function Book(title, author, currentPage, totalPages) {
    this.title = title;
    this.author = author;

    if (bookReadCheck.checked) {
        this.currentPage = totalPages;
    } else {
        this.currentPage = currentPage;
    }

    this.totalPages = totalPages;
    this.isRead = isReadYet(currentPage, totalPages)
}

function printBook(book) {
    console.log(`title: ${book.title}\nauthor: ${book.author}\ncurrent pages: ${book.currentPage}\ntotal pages: ${book.totalPages}`);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function isReadYet(pagesRead, totalPages) {
    return pagesRead === totalPages;
}

// dialog

function createBookObject() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const totalPages = document.getElementById('total-pages').value;
    const currentPage = document.getElementById('current-page').value;

    if (validateInput()) {

        const newBook = new Book(title, author, parseInt(currentPage, 10), parseInt(totalPages, 10));
    
        addBookToLibrary(newBook);
        deleteAllBooks();
        addBookToBooks(myLibrary);
    
        clearAllInputFields();
    };


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

function checkIfBookRead(index) {
    flag = false;
    if (myLibrary[index].currentPage === myLibrary[index].totalPages) {
        flag = true;
        myLibrary[index].isRead = flag;
    } else {
        myLibrary[index].isRead = flag;
    }
    return true;
}

function validateInput() {
    flag = false;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const totalPages = parseInt(document.getElementById('total-pages').value, 10);
    const currentPage = parseInt(document.getElementById('current-page').value, 10);

    if (!title) {
        alert('Title is required.');
        return flag;
    }
    if (!author) {
        alert('Author is required.');
        return flag;
    }
    if (!totalPages) {
        alert('Total pages is required.');
        return flag;
    }
    if (!currentPage && document.getElementById('current-page').disabled === false) {
        alert('Current page is required.');
        return flag;
    }
    if (currentPage > totalPages) {
        alert('You can\'t read more than the total pages');
        return flag;
    }

    flag = true;
    return flag;
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
    buttonMark.classList.add("envelope-mark");
    
    h3.textContent = newBook.title;
    bookAuthor.textContent = newBook.author;
    pageStart.textContent = newBook.currentPage;
    slash.textContent = '/';
    pageEnd.textContent = newBook.totalPages;
    bookRead.textContent = "pages read";

    if (newBook.isRead) {
        iMark.classList.add("fa-solid", "fa-envelope-circle-check");
    } else {
        iMark.classList.add("fa-regular", "fa-envelope");
    }

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
        if (myLibrary[i] !== undefined) {
            createBookContainer(myLibrary[i], i);
        }
    }
}

function incrementCurrentPage(index) {
    if (myLibrary[index].currentPage < myLibrary[index].totalPages) {
        myLibrary[index].currentPage++;
        checkIfBookRead(index);
    }
}

function decrementCurrentPage(index) {
    if (myLibrary[index].currentPage > 0) {
        myLibrary[index].currentPage--;
        checkIfBookRead(index);
    }
}

function deleteAllBooks() {
    while(books.firstChild) {
        books.removeChild(books.firstChild);
    }
}

function deleteBook(index) {
    delete myLibrary[index];
    deleteAllBooks();
    addBookToBooks(myLibrary);
}

function editBook(index) {
    const currentPage = document.getElementById('current-page');

    changeModalDetailsUpdate();
    const book = myLibrary[index];

    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('total-pages').value = book.totalPages;
    document.getElementById('current-page').value = book.currentPage;

    if (book.isRead) {
        bookReadCheck.checked = true;
        currentPage.disabled = true;
    }

    addBookDialog.showModal();
}

function changeModalDetailsUpdate() {
    addBookSubmit.classList.add("update");
    dialogTitle.textContent = "Update Book Details";
    addBookSubmit.textContent = "Update Book";
}

function changeModalDetailsAdd() {
    dialogTitle.textContent = "Add New Book";
    addBookSubmit.textContent = "Add Book";
}

function updateBookDetails(book) {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let totalPages = document.getElementById('total-pages').value;
    let currentPage = document.getElementById('current-page').value;

    book.title = title;
    book.author = author;
    book.totalPages = parseInt(totalPages, 10);

    if (bookReadCheck.checked || isReadYet(currentPage, totalPages)) {
        book.currentPage = parseInt(totalPages, 10);
        book.isRead = true;
    } else {
        book.currentPage = parseInt(currentPage, 10);
        book.isRead = false;
    }

}

function changeEnvelopeStatus(index) {
    const book = myLibrary[index];
    book.isRead = true;
    book.currentPage = book.totalPages;
    deleteAllBooks();
    addBookToBooks(myLibrary);
}

addBookButton.addEventListener("click", () => {
    changeModalDetailsAdd();
    addBookDialog.showModal();
})

cancel.addEventListener("click", () => {
    clearAllInputFields();
    addBookDialog.close();
})

addBookSubmit.addEventListener("click", (e) => {
    if (!addBookSubmit.classList.contains("update")) {
        if (validateInput()) {
            createBookObject();
            addBookDialog.close();
        }
    } else {
        updateBookDetails(myLibrary[currentIndex]);
        addBookDialog.close();
        deleteAllBooks();
        addBookToBooks(myLibrary);
        clearAllInputFields();

    }
    
})

bookReadCheck.addEventListener("click", isBookRead);

bookNotReadCheck.addEventListener("click", isBookRead);

// increments / decrements currentPage
books.addEventListener("click", function(event) {

    if (event.target.classList.contains("fa-square-plus")) {

        const book = event.target.closest(".book");

        if (book) {
            const index = book.getAttribute("data-index") ;
            if (index !== null) {
                const pageStart = book.querySelector(".page-start");
                const pageEnd = book.querySelector(".page-end");
                let currentPage = parseInt(pageStart.textContent, 10);
                let totalPages = parseInt(pageEnd.textContent, 10);
                if (currentPage < totalPages) {
                    currentPage++;
                    incrementCurrentPage(index);
                }
                pageStart.textContent = currentPage;
            }
        }
    
    } else if (event.target.classList.contains("fa-square-minus")) {
        const book = event.target.closest(".book");

        if (book) {
            const index = book.getAttribute("data-index") ;
            if (index !== null) {
                const pageStart = book.querySelector(".page-start");
                let currentPage = parseInt(pageStart.textContent, 10);
                if (currentPage > 0) {
                    currentPage--;

                }
                pageStart.textContent = currentPage;
                decrementCurrentPage(index);
            }
        }
    }
})

// deletes book
books.addEventListener("click", function(event) {
    if (event.target.classList.contains("fa-circle-xmark")) {
        const book = event.target.closest(".book");

        if (book) {
            const index = book.getAttribute("data-index") ;
            if (index !== null) {
                deleteBook(index);
            }
        }
    }
})

// prompts modal to edit book properties
books.addEventListener("click", function(event) {
    if (event.target.classList.contains("fa-pen-to-square")) {
        const book = event.target.closest(".book")
        if (book) {
            const index = book.getAttribute("data-index") 
            if (index !== null) {
                currentIndex = index;
                editBook(index);
            }
            
        }
    }
})

// mark as read
books.addEventListener("click", function(event) {
    if (event.target.classList.contains("fa-envelope")) {
        const book = event.target.closest(".book")
        if (book) {
            const index = book.getAttribute("data-index") 
            if (index !== null) {
                currentIndex = index;
                changeEnvelopeStatus(index);
            }
            
        }
    }
})

const book1 = new Book("The Da Vinci Code", "Dan Brown", 81, 597);
myLibrary.push(book1);
createBookContainer(book1, 0);

const book2 = new Book("Meow : A Novel", "Sam Austen", 56, 375);
myLibrary.push(book2);
createBookContainer(book2, 1);

const book3 = new Book("Thinking, Fast and Slow", "Daniel Kahneman", 105, 462);
myLibrary.push(book3);
createBookContainer(book3, 2);

