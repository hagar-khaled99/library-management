const { Borrowing, Book, Borrower } = require("../models");
const { Op } = require("sequelize");
const db = require("../models");
const BorrowedBookMapper = require("../mappers/borrowedBookMapper");
const OverdueBookMapper = require("../mappers/overdueBookMapper");

exports.checkOutBook = async (req, res) => {
  const { borrowerId } = req.params;
  const { bookId } = req.body;
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (book.quantity === 0) {
      return res
        .status(400)
        .json({ error: "Book is not available for checkout" });
    }
    // Set due date (e.g., 14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    const borrowing = await Borrowing.create({ borrowerId, bookId, dueDate });

    await book.decrement("quantity");
    res.json({ message: "Book checked out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.returnBook = async (req, res) => {
  const { borrowerId } = req.params;
  const { bookId } = req.body;
  try {
    const borrowing = await Borrowing.findOne({
      where: { borrowerId, bookId, returnedAt: null },
    });
    if (!borrowing) {
      return res.status(404).json({ error: "Borrowing record not found" });
    }
    await borrowing.update({ returnedAt: new Date() });
    const book = await Book.findByPk(bookId);
    if (book) {
      await book.increment("quantity");
    }

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getBorrowedBooks = async (req, res) => {
  const { borrowerId } = req.params;
  try {
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }
    const borrowedBooks = await Borrowing.findAll({
      where: { borrowerId, returnedAt: null },
      include: [{ model: Book }],
    });
    const borrowedBooksDTO = borrowedBooks.map((borrowedBook) =>
      BorrowedBookMapper.toDTO(borrowedBook)
    );

    res.json(borrowedBooksDTO);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await Borrowing.findAll({
      include: [{ model: Book }, { model: Borrower }],
      where: {
        [Op.or]: [
          {
            dueDate: { [Op.lt]: new Date() },
            returnedAt: { [Op.eq]: null },
          },
          {
            returnedAt: { [Op.gt]: db.sequelize.col("dueDate") },
          },
        ],
      },
    });
    const overdueBooksDTO = overdueBooks.map((overdueBook) =>
      OverdueBookMapper.toDTO(overdueBook)
    );
    res.json(overdueBooksDTO);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

