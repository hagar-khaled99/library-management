const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");
const {
  validateBorrower,
  validate,
} = require("../validators/borrowerValidator");

router.get("/", borrowerController.getAllBorrowers);
router.get("/:id", borrowerController.getBorrowerById);
router.post("/", validateBorrower, validate, borrowerController.addBorrower);
router.put("/:id", borrowerController.updateBorrower);
router.delete("/:id", borrowerController.deleteBorrower);

module.exports = router;
