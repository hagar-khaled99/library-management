const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { validateBook, validate } = require("../validators/bookValidator");

router.get("/", bookController.getAllBooks);
router.get("/search", bookController.searchBooks);
router.get("/:id", bookController.getBookById);
router.post("/", validateBook, validate, bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
