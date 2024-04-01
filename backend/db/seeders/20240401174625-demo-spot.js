'use strict';

/** @type {import('sequelize-cli').Migration} */
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
   queryInterface.bulkInsert('Spots', [
    {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "avgRating": 4.5,
      "previewImage": "image url"
    },
    {
      "id": 2,
      "ownerId": 2,
      "address": "123 Road Ln",
      "city": "Philadelphia",
      "state": "Pennsylvania",
      "country": "United States of America",
      "lat": 3.1415269,
      "lng": 1234.56789,
      "name": "Park Place",
      "description": "Monopoly",
      "price": 90,
      "createdAt": "2022-11-19 20:39:36",
      "updatedAt": "2022-11-19 20:39:36",
      "avgRating": 4.8,
      "previewImage": "image url"
    },
    {
      "id": 3,
      "ownerId": 2,
      "address": "123 Lane Rd",
      "city": "New York",
      "state": "New York",
      "country": "United States of America",
      "lat": 312.141534269,
      "lng": 334.5634789,
      "name": "Boardwalk",
      "description": "Monopoly",
      "price": 125,
      "createdAt": "2023-12-19 23:39:36",
      "updatedAt": "2023-12-19 23:39:36",
      "avgRating": 5.0,
      "previewImage": "image url"
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Spots', null, {})
  }
};
