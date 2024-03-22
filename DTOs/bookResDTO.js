class BookResDTO {
    constructor(id,title, author, isbn, quantity, shelf_location) {
      this.id = id;  
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.quantity = quantity;
      this.shelf_location = shelf_location;
    }
  }
  
  module.exports = BookResDTO;
  