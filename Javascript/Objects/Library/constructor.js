let myLibrary = [{
    title: 'test',
    author: 'test author',
    pages: 300,
    isRead: true
},
{
    title: 'test1',
    author: 'test author 1',
    pages: 300,
    isRead: true
},
{
    title: 'test2',
    author: 'test author 2',
    pages: 300,
    isRead: true
}];

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

function toggleRead() {
    this.isRead = !this.isRead;
}

Book.prototype.toggleRead = toggleRead;

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let isRead = document.getElementById("yes").checked;

    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    render(book, myLibrary.length-1);
}


// rendering the books to our webpage
function render(book, index) {
    var bookHtml = `<tr class="book-row" data-attribute="${index}">
        <td  class="title" colspan="2">${book.title}</td>
        <td class="author" colspan="2">${book.author}</td>
        <td class="pages" colspan="2">${book.pages}</td>
        <td class="read" colspan="2">
        <button type="button" class="read-button">${book.isRead?'Read':'Yet to read'}</button>
        </td>
        <td class="delete" colspan="2">
        <button type="button" class="delete-button">Delete</button>
        </td>
    </tr>`;
    document.querySelector('.library-container table').innerHTML += bookHtml;
}

myLibrary.forEach(function(book, index) {
    render(book, index);
});

document.querySelector('.addNewBookButton').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('form').classList.toggle('hidden');
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary();
});


document.querySelector('table').addEventListener( "click", deleteBook );

function deleteBook(event){
    var element = event.target;
    if(element.tagName == 'button' || element.classList.contains("delete-button")){
        let index = element.parentNode.parentNode.getAttribute('data-attribute');
        let parent = element.parentNode.parentNode;

        // Removes the row from the DOM
        parent.remove();

        // Removes the book object from the myLibrary array
        myLibrary.splice(index, 1);

        // Sets the data-attributes again to reflect the changes in the books array
        let rows = document.querySelectorAll('tr.book-row');
        for(let i=0;i<rows.length;i++) {
            rows[i].setAttribute('data-attribute', i);
        }

    }
}
const toggleBookRead = (e) => {
    e.preventDefault();
    if(e.target.tagName === "button" || e.target.classList.contains("read-button")) {
        let index = e.target.parentNode.parentNode.getAttribute('data-attribute');
        myLibrary[index].toggleRead();
        e.target.innerHTML = `${myLibrary[index].isRead?'Read':'Yet to read'}`;
    }
}
document.querySelector('table').addEventListener("click", toggleBookRead);

