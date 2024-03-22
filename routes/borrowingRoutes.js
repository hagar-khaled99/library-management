const express = require("express");
const router = express.Router();
const borrowingController = require("../controllers/borrowingController");
router.post("/:borrowerId/checkout", borrowingController.checkOutBook);
router.post("/:borrowerId/return", borrowingController.returnBook);
router.get("/:borrowerId/books", borrowingController.getBorrowedBooks);
router.get("/overdue", borrowingController.getOverdueBooks);


module.exports = router;
