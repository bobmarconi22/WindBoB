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
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "/spot6.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "/spot1.jpg",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "/spot12.jpg",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://media.architecturaldigest.com/photos/631a4ea2032fd8c9fc52862c/master/w_1280,c_limit/MY%20AHPO-INFORMAL%20DINING%C2%A9Guillaume%20Plisson%20-HY5A0008.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://media.architecturaldigest.com/photos/631a4f9d0ad3a4ac2395e1c7/master/w_1280,c_limit/ROCKIT_15_vb1769798_1620x1080%20copy.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://media.architecturaldigest.com/photos/631a4ff78e86af1526b84399/master/w_1280,c_limit/CF013025_Bags.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://media.architecturaldigest.com/photos/631a50370ad3a4ac2395e1c9/master/w_1280,c_limit/20200717_1_0302.jpg",
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
