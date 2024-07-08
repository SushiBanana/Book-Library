const myLibrary = []
const addBookButton = document.getElementById("addBookButton")

function Book(title, author, dateRead, pagesRead, totalPages) {
    this.title = title;
    this.author = author;
    this.dateRead = dateRead;
    this.pagesRead = pagesRead;
    this.totalPages = totalPages;
    this.isRead = isReadYet(pagesRead, totalPages)
}

function printBook(book) {
    console.log(`title: ${book.title}`)
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function isReadYet (pagesRead, totalPages) {
    return pagesRead === totalPages;
}
const book1 = new Book("storyOfMyLife", "alysha", "7/6/2024", 22, 23)

addBookButton.addEventListener("click", () => {
    addBookButton.style.color = "red";
})



    