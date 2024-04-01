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
    await queryInterface.bulkInsert('SpotImages', [{
      'spotId': 1,
      'url': 'Image Url',
      'preview': true,
    },
    {
      'spotId': 1,
      'url': 'Image Url 2',
      'preview': false,
    },
    {
      'spotId': 1,
      'url': 'Image Url 3',
      'preview': false,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
