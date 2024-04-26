"use strict";

const { Review } = require("../models");
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
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 5,
          review: "Great time! I absolutely loved my stay!! Had so much fun, and I cant wait to bring my family!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 6,
          review: "It's really hard to get a reservation... That's what she said",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 4,
          review: "Wow! what a view!!! Absolutely surreal!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 3,
          review: "Honestly... this was a really cool experience! Was nervous about paying so much but had so much fun!!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 5,
          review: "The place was nice! But I was very disappointed, as it rained through my entire 3 day stay!",
          stars: 2,
        },
        {
          spotId: 2,
          userId: 4,
          review: "I LOVE falling asleep to the sound of rain! phenomenal spot!!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 2,
          review: "Really good place to get away, a lot of rain...",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 6,
          review: "Nowhere to park my Seabring!",
          stars: 2,
        },
        {
          spotId: 7,
          userId: 5,
          review: "All I can say is WOW!!!",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 2,
          review: "Pretty impressive and not too expensive",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 6,
          review: "Had a lot of fun! I invited Ryan to come with me but he said he needed an emergency hysterectomy or something... Im worried about him...",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 3,
          review: "Great time! I absolutely loved my stay!!",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 3,
          review: "Good time! I might come back",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 4,
          review: "VERY HOT, seems a little over priced, but it was a neat experience!",
          stars: 3,
        },
        {
          spotId: 4,
          userId: 6,
          review: "VERY disappointed they didn't give me a discount when I told them I was a Regional Manager",
          stars: 2,
        },
        {
          spotId: 5,
          userId: 2,
          review: "Really nice view",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 4,
          review: "SUPER inexpensive!!",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 5,
          review: "I see the atmosphere they're trying to make, but I was just let down...",
          stars: 2,
        },
        {
          spotId: 6,
          userId: 2,
          review: "Very fun weekend",
          stars: 5,
        },
        {
          spotId: 6,
          userId: 3,
          review: "Good time, absolutely will consider coming back",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 5,
          review: "I WILL NEVER RETURN... THIS WAS THE WORST EXPERIENCE I HAVE EVER HAD WITH THIS SERVICE!!! I AM APPALLED. ZERO STARS IF I COULD",
          stars: 1,
        },
        {
          spotId: 7,
          userId: 6,
          review: "So much fun... Tan everywhere... Jan everywhere...",
          stars: 5,
        },
        {
          spotId: 7,
          userId: 3,
          review: "Very middle of the pack, didn't totally love it but it wasn't bad",
          stars: 3,
        },
        {
          spotId: 8,
          userId: 2,
          review: "Had to cancel last minute for... business reasons... they fully refunded me though no questions asked!",
          stars: 5,
        },
        {
          spotId: 8,
          userId: 5,
          review: "A few weeks ago I thought I had the worst experience on this app... however I WAS WRONG THIS PLACE WAS HORRIBLE!!!! I WANT MY MONEY BACK.... I am contacting support over this atrocity!",
          stars: 1,
        },
        {
          spotId: 9,
          userId: 5,
          review: "This place was amazing!!! I almost stopped using this service after my last few encounters! thank goodness for this place!",
          stars: 4,
        },
        {
          spotId: 9,
          userId: 3,
          review: "Great weekend, right off Shore of an outstanding golf course (make sure to bring your clubs!!!!",
          stars: 5,
        },
        {
          spotId: 10,
          userId: 5,
          review: "It was a good weekend, my grandkids loved it!",
          stars: 5,
        },
        {
          spotId: 11,
          userId: 2,
          review: "Great time, lots of snacks the owners said we had free reign over!",
          stars: 5,
        },
        {
          spotId: 12,
          userId: 3,
          review: "Worth EVERY penny!!",
          stars: 5,
        },
        {
          spotId: 12,
          userId: 6,
          review: "I had so much fun the first few days... Then the whole trip was ruined when I burnt my foot...",
          stars: 5,
        },
        {
          spotId: 13,
          userId: 3,
          review: "Really awesome place, totally recommend",
          stars: 5,
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
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  },
};
