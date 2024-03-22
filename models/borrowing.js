"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Borrowing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Borrowing.belongsTo(models.Book, {
        foreignKey: "bookId",
        onDelete: "CASCADE",
      });
      Borrowing.belongsTo(models.Borrower, {
        foreignKey: "borrowerId",
        onDelete: "CASCADE",
      });
    }
  }
  Borrowing.init(
    {
      bookId: DataTypes.INTEGER,
      borrowerId: DataTypes.INTEGER,
      returnedAt: DataTypes.DATE,
      dueDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Borrowing",
    }
  );
  return Borrowing;
};
