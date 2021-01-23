class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {

        const list = document.getElementById('book-list');
        // create tr element
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class = "delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        //Add Text
        div.appendChild(document.createTextNode(message));
        //get parent
        const container = document.querySelector('.container');
        //Get form
        const form = document.querySelector("#book-form");
        //Insert Alert
        container.insertBefore(div, form);

        //Timeout after 3s
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

//Local Storage Class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            //Add Book To List
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
    
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){

    //Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    // Instantiate a book object
    const book = new Book(title, author, isbn);

    // Instantiate UI object
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === ' '){
        // Error Alert
        ui.showAlert('Please fill in all fields', 'alert-danger');
    } else{
        // Add book to the list
        ui.addBookToList(book);

        // commit to LS
        Store.addBook(book);

        //Show success
        ui.showAlert('Book Added!', 'alert-success');

        
        //Clear Fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Delete button
document.getElementById('book-list').addEventListener('click', function(e){

    ui = new UI();
    ui.deleteBook(e.target);

    // Remove from LocalStroage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show Alert
    ui.showAlert('Book Removed!', 'alert-success');

    e.preventDefault();
});