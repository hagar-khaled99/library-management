class BorrowedBookDTO {
  constructor(id, title, author, isbn, borrowedAt) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.borrowedAt = borrowedAt;
  }
}

module.exports = BorrowedBookDTO;
