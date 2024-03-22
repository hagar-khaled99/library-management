const OverdueBookDTO = require("../DTOs/overdueBookDTO");

class OverdueBookMapper {
  static toDTO(overdueBook) {
    const borrowing = overdueBook;
    const borrower = borrowing.Borrower;
    const book = borrowing.Book;
    const dueDate = borrowing.dueDate;
    const returnDate = borrowing.returnedAt;

    return new OverdueBookDTO(
      borrower.id,
      borrower.name,
      book.id,
      book.title,
      borrowing.createdAt,
      dueDate,
      returnDate,
      book.isbn
    );
  }
}

module.exports = OverdueBookMapper;
