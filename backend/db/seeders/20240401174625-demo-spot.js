"use strict";

const { Spot } = require("../models");
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
    queryInterface.bulkInsert(
      "Spots",
      [
        {
          id: 1,
          ownerId: 1,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "App Academy",
          description: "Place where web developers are created",
          price: 123,
        },
        {
          id: 2,
          ownerId: 2,
          address: "123 Road Ln",
          city: "Philadelphia",
          state: "Pennsylvania",
          country: "United States of America",
          lat: 3.1415269,
          lng: 123.56789,
          name: "Park Place",
          description: "Monopoly",
          price: 90,
        },
        {
          id: 3,
          ownerId: 2,
          address: "123 Lane Rd",
          city: "New York",
          state: "New York",
          country: "United States of America",
          lat: 12.141534269,
          lng: 34.5634789,
          name: "Boardwalk",
          description: "Monopoly",
          price: 125,
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
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  },
};
