let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        var readStr = isRead?'read':'not read yet';
        return (title+' by '+author+', '+pages+' pages, '+  readStr);
    }
}

Book.prototype.toggleRead = (book) => {
    book.isRead = !book.isRead;
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let isRead = document.getElementById("yes").checked;

    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    render(book);
}

function render(book) {
    var bookHtml = `<tr data-attribute="${myLibrary.length-1}">
        <td  class="title" colspan="2">${book.title}</td>
        <td class="author" colspan="2">${book.author}</td>
        <td class="pages" colspan="2">${book.pages}</td>
        <td class="read" colspan="2">${book.isRead?'read':'yet to read'}</td>
        <td class="delete" colspan="2><button type="button">Delete</button><td>
    </tr>`;
    document.querySelector('.library-container table').innerHTML += bookHtml;
}

document.querySelector('.addNewBookButton').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('form').classList.toggle('hidden');
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary();
    document.getElementsByName('bookForm')[0].reset();
});

document.addEventListener( "click", deleteBook );

function deleteBook(event){
    var element = event.target;
    if(element.tagName == 'button' || element.classList.contains("delete")){
        // let index = element.dataset.dataAttribute;
        // myLibrary.splice(index, 1);
        console.log('here');

    }
}

document.addEventListener("click", toggleBookRead);

const toggleBookRead = (e) => {
    e.preventDefault();
    if(e.target.tagName === "td" && e.target.classList.contains("read")) {
        this.toggleRead;
    }
}