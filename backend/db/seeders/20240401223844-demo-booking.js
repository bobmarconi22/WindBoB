"use strict";

const { Booking } = require("../models");
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
    await Booking.bulkCreate(
      [
        {
          spotId: 3,
          userId: 2,
          startDate: new Date("2024-11-06"),
          endDate: new Date("2024-11-24"),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2023-12-17"),
          endDate: new Date("2023-12-24"),
        },
        {
          spotId: 3,
          userId: 2,
          startDate: new Date("2024-12-17"),
          endDate: new Date("2024-12-24"),
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
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  },
};
