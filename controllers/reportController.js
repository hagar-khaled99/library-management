const { Borrowing, Book, Borrower } = require("../models");
const { Op } = require("sequelize");
const { parse } = require("json2csv");
exports.getAnalyticalReports = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const borrowingData = await Borrowing.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [{ model: Book }, { model: Borrower }],
    });
    // Calculate number of borrowings per day
    const borrowingsPerDay = {};
    borrowingData.forEach((borrowing) => {
      const date = borrowing.createdAt.toDateString();
      if (!borrowingsPerDay[date]) {
        borrowingsPerDay[date] = 0;
      }
      borrowingsPerDay[date]++;
    });
    // Calculate most borrowed books
    const mostBorrowedBooks = {};
    borrowingData.forEach((borrowing) => {
      const bookId = borrowing.bookId;
      if (!mostBorrowedBooks[bookId]) {
        mostBorrowedBooks[bookId] = {
          title: borrowing.Book.title,
          count: 0,
        };
      }
      mostBorrowedBooks[bookId].count++;
    });
    // Calculate most active borrowers
    const mostActiveBorrowers = {};
    borrowingData.forEach((borrowing) => {
      const borrowerId = borrowing.borrowerId;
      if (!mostActiveBorrowers[borrowerId]) {
        mostActiveBorrowers[borrowerId] = {
          name: borrowing.Borrower.name,
          count: 0,
        };
      }
      mostActiveBorrowers[borrowerId].count++;
    });

    const csvData = [
      { BorrowingsPerDay: JSON.stringify(borrowingsPerDay) },
      { MostBorrowedBooks: JSON.stringify(Object.values(mostBorrowedBooks)) },
      {
        MostActiveBorrowers: JSON.stringify(Object.values(mostActiveBorrowers)),
      },
    ];
    const csv = parse(csvData);
    res.header("Content-Type", "text/csv");
    res.attachment("analytical_reports.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


exports.exportOverdueBorrowsLastMonth = async (req, res) => {
  try {
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const overdueBorrows = await Borrowing.findAll({
      where: {
        returnedAt: null,
        dueDate: { [Op.lt]: lastMonthDate },
      },
      include: [{ model: Book }, { model: Borrower }],
    });
    const formattedData = overdueBorrows.map((borrow) => ({
      borrower: borrow.Borrower.name,
      book: borrow.Book.title,
      dueDate: borrow.dueDate,
    }));
    const fields = ["borrower", "book", "dueDate"];

    const csv = parse(formattedData, { fields });
    res.header("Content-Type", "text/csv");
    res.attachment("overdue_borrows_last_month.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
