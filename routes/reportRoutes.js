const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/analytical-reports", reportController.getAnalyticalReports);
router.get(
  "/overdue-borrows-last-month",
  reportController.exportOverdueBorrowsLastMonth
);
module.exports = router;
