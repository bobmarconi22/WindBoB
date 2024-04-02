'use strict';

const { Booking } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Bookings', [{
    "spotId": 1,
    "userId": 2,
    "startDate": '2024-04-01',
    "endDate": '2023-04-15',
   },
   {
    "spotId": 2,
    "userId": 3,
    "startDate": '2024-05-01',
    "endDate": '2023-06-15',
   }
  ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options, {}, {});
  }
};
