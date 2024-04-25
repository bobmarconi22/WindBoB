"use strict";

const { Review } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          review: "Great time! I absolutely loved my stay!!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 3,
          review: "Good time! I might come back",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 2,
          review: "wowzers",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 1,
          review: "This place stunk",
          stars: 1,
        },
        {
          spotId: 3,
          userId: 3,
          review: "Meh",
          stars: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  },
};
