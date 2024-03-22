const BookResDTO = require("../DTOs/bookResDTO");

class BookMapper {
  static BookToBookResDTO(book) {
    return new BookResDTO(
      book.id,
      book.title,
      book.author,
      book.isbn,
      book.quantity,
      book.shelf_location
    );
  }
}

module.exports = BookMapper;
