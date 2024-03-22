class OverdueBookDTO {
  constructor(
    borrowerId,
    borrowerName,
    bookId,
    bookName,
    borrowDate,
    dueDate,
    returnDate,
    isbn
  ) {
    this.borrowerId = borrowerId;
    this.borrowerName = borrowerName;
    this.bookId = bookId;
    this.bookName = bookName;
    this.borrowDate = borrowDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
    this.isbn = isbn;
  }
}
module.exports = OverdueBookDTO;
