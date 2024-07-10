const myLibrary = []

// main
const addBookButton = document.getElementById("add-book-button") // plus
const addBookDialog = document.getElementById("add-book-dialog") // dialog

// dialog
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const totalPages = document.getElementById('total-pages').value;
const currentPage = document.getElementById('current-page').value;


const cancel = document.getElementById("cancel")
const addBookSubmit = document.getElementById("add-book-submit") // dialog submit button

function Book(title, author, currentPage, totalPages) {
    this.title = title;
    this.author = author;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.isRead = isReadYet(currentPage, totalPages)
}

function printBook(book) {
    console.log(`title: ${title}\nauthor: ${author}\ntotal pages: ${totalPages}\ncurrent pages: ${currentPage}`);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function isReadYet (pagesRead, totalPages) {
    return pagesRead === totalPages;
}
const book1 = new Book("The Da Vinci Code", "Dan Brown", 23, 55)

// dialog

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

function createBookObject() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const totalPages = document.getElementById('total-pages').value;
    const currentPage = document.getElementById('current-page').value;

    

    clearAllInputFields();
}

function clearAllInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('total-pages').value = '';
    document.getElementById('current-page').value = '';
}

    