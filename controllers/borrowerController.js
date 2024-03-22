const { Borrower } = require("../models");
const BorrowerMapper = require("../mappers/borrowerMapper");

exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    const borrowersDTO = borrowers.map((borrower) =>
      BorrowerMapper.BorrowerToBorrowerResDTO(borrower)
    );
    res.json(borrowersDTO);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getBorrowerById = async (req, res) => {
  const id = req.params.id;
  try {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      return res.status(404).send("Borrower not found");
    }
    BorrowerMapper.BorrowerToBorrowerResDTO(borrower);
    res.json(borrower);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.addBorrower = async (req, res) => {
  const borrowerData = req.body;
  try {
    const borrower = await Borrower.create(borrowerData);
    res.send("Borrower added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.updateBorrower = async (req, res) => {
  const id = req.params.id;
  const borrowerData = req.body;
  try {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      return res.status(404).send("Borrower not found");
    }
    await borrower.update(borrowerData);
    res.send("Borrower updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.deleteBorrower = async (req, res) => {
  const id = req.params.id;
  try {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      return res.status(404).send("Borrower not found");
    }
    await borrower.destroy();
    res.send("Borrower deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
