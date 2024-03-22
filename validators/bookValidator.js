const { body, validationResult } = require("express-validator");

const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("isbn").notEmpty().withMessage("ISBN is required"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer number"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateBook, validate };
