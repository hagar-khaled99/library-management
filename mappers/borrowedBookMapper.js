const BorrowedBookDTO = require("../DTOs/borrowedBookDTO");

class BorrowedBookMapper {
  static toDTO(borrowedBook) {
    const book = borrowedBook.Book;
    return new BorrowedBookDTO(
      book.id,
      book.title,
      book.author,
      book.isbn,
      borrowedBook.createdAt
    );
  }
}

module.exports = BorrowedBookMapper;
