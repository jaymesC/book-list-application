// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Constructor
function UI() {}

//Add Book To List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  row.id = 'rows'
  //insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class = "delete">X</a></td>
  `
  list.appendChild(row);
}


// Error Message function
UI.prototype.Message = function(message, className){

  // create Element
  const div = document.createElement('div')
  // Add classnames
  div.className = `alert ${className}`
  div.id = 'alertId';

  //get parent
  const container = document.querySelector('.container');
  //create a text node
  div.appendChild(document.createTextNode(message));
  //Get Form
  const form = document.querySelector('#book-form')
  // insert alert
  container.insertBefore(div, form)
  // set time Out
  setTimeout(function(){
    document.querySelector('.alert').remove()
  }, 3000)
}




//getting the X mark MY METHOD!!!
// const mark = document.querySelector('#book-list')
// mark.addEventListener('click',removeF)
// function removeF(e){
// if(e.target.classList.contains('delete')){
//   if(confirm('Are you sure?')){
//     e.target.parentElement.parentElement.remove();
//     }
//   }
// }


  // Delete book
  UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }



//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}




// EVENT Listener for Add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();
  // Validating the books picked
  if(!title || !author || !isbn){
    ui.Message('Please fill all the Fields', 'error');
  }else{
    //Message to show book was added successfully
    ui.Message('Book successfully Added', 'success');
    // Add book to List
    ui.addBookToList(book);
    //Clear fields
    ui.clearFields();
  }
  e.preventDefault();
})

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  // Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //  Show Message
  ui.Message('Book Removed!', 'success')
  e.preventDefault();
})