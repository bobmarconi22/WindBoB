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
    await Spot.bulkCreate(
      [
        {
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
          ownerId: 1,
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
          ownerId: 2,
          address: "1111 One rd",
          city: "West Field",
          state: "New Jersey",
          country: "United States of America",
          lat: 1.141534269,
          lng: 33.5634789,
          name: "Go Space",
          description: "Monopoly",
          price: 200,
        },
        {
          ownerId: 2,
          address: "1234 Five Ln",
          city: "Middle of",
          state: "Nowhere",
          country: "United States of America",
          lat: 0.141534269,
          lng: 0.5634789,
          name: "Railroad",
          description: "Monopoly",
          price: 99,
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
