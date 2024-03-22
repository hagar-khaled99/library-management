const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const borrowerRoutes = require("./routes/borrowerRoutes");
const borrowingRoutes = require("./routes/borrowingRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books", bookRoutes);
app.use("/borrowers", borrowerRoutes);
app.use("/borrowings", borrowingRoutes);
app.use("/reports", reportRoutes);
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.get("/", (req, res) => {
  res.json({ message: "Welcome to library management system" });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
