const { Book } = require("../models");
const { Op } = require("sequelize");
const BookDTO = require("../DTOs/bookDTO");
const BookMapper = require("../mappers/bookMapper");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    const booksDTO = books.map((book) => BookMapper.BookToBookResDTO(book));
    res.json(booksDTO);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    const bookResDTO = BookMapper.BookToBookResDTO(book);
    res.json(bookResDTO);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.addBook = async (req, res) => {
  const { title, author, isbn, quantity, shelf_location } = req.body;
  try {
    const bookDTO = new BookDTO(title, author, isbn, quantity, shelf_location);
    const book = await Book.create(bookDTO);
    const bookResDTO = BookMapper.BookToBookResDTO(book);
    res
      .status(201)
      .json({ message: "Book created successfully", book: bookResDTO });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.updateBook = async (req, res) => {
  const id = req.params.id;
  const bookData = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    await book.update(bookData);
    res.send("Book updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    await book.destroy();
    res.send("Book deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.searchBooks = async (req, res) => {
  const { title, author, isbn } = req.query;
  try {
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${title}%` } },
          { author: { [Op.like]: `%${author}%` } },
          { isbn: { [Op.like]: `%${isbn}%` } },
        ],
      },
    });
    const booksDTO = books.map((book) => BookMapper.BookToBookResDTO(book));
    res.json(booksDTO);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
