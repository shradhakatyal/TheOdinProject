let myLibrary = [];
let myBooks = [];
if(localStorage.myLibrary) {
    // myLibrary = ;
    JSON.parse(localStorage.getItem("myLibrary")).forEach((bookObj) => {
        myLibrary.push(Object.setPrototypeOf(bookObj, Book));
    });
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    for(let i=0;i<myLibrary.length;i++) {
        myBooks.push(Object.assign(new Book, myLibrary[i]));
    }
}
console.log(myBooks);

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

function init() {
    let node = {
        title: document.querySelector('#title'),
        author: document.querySelector('#author'),
        pages: document.querySelector('#pages'),
        isRead: document.getElementById("yes")
    }

    return node;
}

var el = init();

function addBookToLibrary() {
    
    let book = new Book(el.title.value, el.author.value, el.pages.value, el.isRead.checked);
    myBooks.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myBooks));
    render(book, myBooks.length-1);
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

// Rendering books on page refresh
if(myBooks !== []) {
    myBooks.forEach(function(book, index) {
        render(book, index);
    });
}


// Function to validate form 
function validateForm() {
    if(el.title.value && el.pages.value && el.author.value) {
        return true;
    } else {
        return false;
    }
}

document.querySelector('.addNewBookButton').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('form').classList.toggle('hidden');
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    if(validateForm()) {
        addBookToLibrary();
    } else {
        alert('Please fill all the fields');
    }
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
        myBooks.splice(index, 1);

        localStorage.setItem("myLibrary", JSON.stringify(myBooks));

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
        myBooks[index].toggleRead();
        e.target.innerHTML = `${myBooks[index].isRead?'Read':'Yet to read'}`;
        localStorage.setItem("myLibrary", JSON.stringify(myBooks));
    }
}
document.querySelector('table').addEventListener("click", toggleBookRead);

