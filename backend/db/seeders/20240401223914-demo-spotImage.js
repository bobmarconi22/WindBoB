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
          url: "Image Url",
          preview: true,
        },
        {
          spotId: 1,
          url: "Image Url2",
          preview: false,
        },
        {
          spotId: 1,
          url: "Image Url3",
          preview: false,
        },
        {
          spotId: 2,
          url: "Image Url",
          preview: false,
        },
        {
          spotId: 2,
          url: "Image Url2",
          preview: false,
        },
        {
          spotId: 3,
          url: "Image Url",
          preview: false,
        },
        {
          spotId: 3,
          url: "Image Url2",
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
