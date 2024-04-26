"use strict";

const { SpotImage } = require("../models");
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
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "/1-1.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "/1-2.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "/1-3.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "/1-4.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "/1-5.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/2-1.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "/2-2.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/2-3.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/2-4.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "/2-5.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/3-1.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "/3-2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/3-3.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/3-4.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/3-5.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/4-1.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "/4-2.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/4-3.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/4-4.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/4-5.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/5-1.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "/5-2.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/5-3.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/5-4.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/5-5.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/6-1.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "/6-2.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/6-3.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/6-4.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/6-5.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "/7-1.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "/7-2.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "/7-3.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "/7-4.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "/7-5.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "/8-1.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "/8-2.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "/8-3.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "/8-4.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "/8-5.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "/9-1.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "/9-2.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "/9-3.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "/9-4.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "/9-5.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "/10-1.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "/10-2.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "/10-3.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "/10-4.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "/10-5.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "/11-1.jpg",
          preview: true,
        },
        {
          spotId: 11,
          url: "/11-2.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "/11-3.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "/11-4.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "/11-5.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "/12-1.jpg",
          preview: true,
        },
        {
          spotId: 12,
          url: "/12-2.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "/12-3.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "/12-4.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "/12-5.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "/13-1.jpg",
          preview: true,
        },
        {
          spotId: 13,
          url: "/13-2.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "/13-3.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "/13-4.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "/13-5.jpg",
          preview: false,
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
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  },
};
