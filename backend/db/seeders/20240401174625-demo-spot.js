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
          ownerId: 2,
          address: "4623 Ocean Blvd",
          city: "Malibu",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Ocean Villa",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 3250,
        },
        {
          ownerId: 3,
          address: "123 Road Ln",
          city: "Emerald Isle",
          state: "North Carolina",
          country: "United States of America",
          lat: 3.1415269,
          lng: 123.56789,
          name: "The Eye",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 1250,
        },
        {
          ownerId: 4,
          address: "Gulf Shores",
          city: "Gulf Shores",
          state: "Alabama",
          country: "United States of America",
          lat: 1.141534269,
          lng: 33.5634789,
          name: "The Pool",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 999,
        },
        {
          ownerId: 1,
          address: "1234 Five Ln",
          city: "Cameroon",
          state: "Sahara Desert",
          country: "Africa",
          lat: 0.141534269,
          lng: 0.5634789,
          name: "The Oasis",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 1450,
        },
        {
          ownerId: 3,
          address: "123 Road Ln",
          city: "BoothBay Harbor",
          state: "Maine",
          country: "United States Of America",
          lat: 3.1415269,
          lng: 123.56789,
          name: "The Lighthouse",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 749,
        },
        {
          ownerId: 4,
          address: "123 Road Ln",
          city: "Chincoteague Island",
          state: "Virginia",
          country: "United States of America",
          lat: 3.1415269,
          lng: 123.56789,
          name: "The Island",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 1175,
        },
        {
          ownerId: 2,
          address: "1111 One rd",
          city: "Honolulu",
          state: "Hawaii",
          country: "United States of America",
          lat: 1.141534269,
          lng: 33.5634789,
          name: "The Luau",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 2749,
        },
        {
          ownerId: 3,
          address: "1234 Five Ln",
          city: "Miami",
          state: "Florida",
          country: "United States of America",
          lat: 0.141534269,
          lng: 0.5634789,
          name: "The Beach",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 1999,
        },
        {
          ownerId: 4,
          address: "4623 Ocean Blvd",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Ocean Villa",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 2200,
        },
        {
          ownerId: 2,
          address: "4623 Ocean Blvd",
          city: "Ciudad del Carmen",
          state: "Mexico",
          country: "Mexico",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Costal Corridor",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 1800,
        },
        {
          ownerId: 3,
          address: "1111 One rd",
          city: "Bora Bora",
          state: "Islands",
          country: "French Polynesia",
          lat: 1.141534269,
          lng: 33.5634789,
          name: "the Penninsula",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 2725,
        },
        {
          ownerId: 1,
          address: "1234 Five Ln",
          city: "St. George",
          state: "Corfu",
          country: "Greece",
          lat: 0.141534269,
          lng: 0.5634789,
          name: "Kazoos",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 2500,
        },
        {
          ownerId: 2,
          address: "1234 Five Ln",
          city: "Playa Mallorca",
          state: "Guabos",
          country: "Costa Rica",
          lat: 0.141534269,
          lng: 0.5634789,
          name: "The Amazon",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget.",
          price: 2700,
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
