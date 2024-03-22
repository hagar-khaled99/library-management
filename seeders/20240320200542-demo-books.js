"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          isbn: "9780743273565",
          quantity: 5,
          shelf_location: "Fiction",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          isbn: "9780061120084",
          quantity: 3,
          shelf_location: "Classics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
