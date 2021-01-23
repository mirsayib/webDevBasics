// Book Constructor   // Create the book
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor     //Mofdify the Booklist
function UI(){
    UI.prototype.addBookToList = function(book) {
        const list = document.getElementById('book-list');
        // create tr element
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class = "delete"><i class="fa fa-trash fa-lg" aria-hidden="true" id="close"></i></a></td>
        `;

        list.appendChild(row);
    };
    //Show Alert
    UI.prototype.showAlert = function(message, className){
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
    };

    //Delete Book
    UI.prototype.deleteBook = function(target) {
        if(target.parentElement.className === 'delete') {
            target.parentElement.parentElement.parentElement.remove();
        }
    };

    //Clear Fields
    UI.prototype.clearFields = function(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
}

function Store() {
    Store.prototype.getBooks = function() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;       
    };

    Store.prototype.displayBooks = function() {
        store = new Store();
        const books = store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            //Add Book To List
            ui.addBookToList(book);
        });
    };

    Store.prototype.addBook = function(book){
        store = new Store();
        const books = store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    };

    Store.prototype.removeBook = function(isbn) {

        
        const books = this.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
    
        });
        localStorage.setItem('books', JSON.stringify(books));
    };

}
store = new Store();
// DOM Load Event
document.addEventListener('DOMContentLoaded', store.displayBooks);


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

    // Instantiate Store Object
    const store = new Store();

    //Validate
    if(title === '' || author === '' || isbn === ' '){
        // Error Alert
        ui.showAlert('Please fill in all fields', 'alert-danger');
    } else{
        // Add book to the list
        ui.addBookToList(book);

        // commit to LS
        store.addBook(book);

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
    store = new Store();

    ui.deleteBook(e.target);

    // Remove from LocalStroage
    store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

    //Show Alert
    ui.showAlert('Book Removed!', 'alert-success');

    e.preventDefault();
});