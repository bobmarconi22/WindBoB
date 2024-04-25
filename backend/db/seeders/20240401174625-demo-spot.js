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
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Ocean Villa",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 1250,
        },
        {
          ownerId: 3,
          address: "123 Road Ln",
          city: "Atlantic City",
          state: "New Jersey",
          country: "United States of America",
          lat: 3.1415269,
          lng: 123.56789,
          name: "The Reef",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 599,
        },
        {
          ownerId: 4,
          address: "Gulf Shores",
          city: "Gulf Shores",
          state: "Alabama",
          country: "United States of America",
          lat: 1.141534269,
          lng: 33.5634789,
          name: "Waves",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 1000,
        },
        {
          ownerId: 2,
          address: "1234 Five Ln",
          city: "Friday Harbor",
          state: "Washington",
          country: "United States of America",
          lat: 0.141534269,
          lng: 0.5634789,
          name: "Saturday Sun",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 950,
        },
        {
          ownerId: 3,
          address: "4623 Ocean Blvd",
          city: "Laguna Beach",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Costal Corridor",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 1400,
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
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 999,
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
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 200,
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
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 999,
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
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 1325,
        },
        {
          ownerId: 2,
          address: "123 Road Ln",
          city: "BoothBay Harbor",
          state: "Maine",
          country: "United States Of America",
          lat: 3.1415269,
          lng: 123.56789,
          name: "The Lighthouse",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 699,
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
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 1725,
        },
        {
          ownerId: 4,
          address: "1234 Five Ln",
          city: "St. George",
          state: "Corfu",
          country: "Greece",
          lat: 0.141534269,
          lng: 0.5634789,
          name: "Kazzoos",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam viverra orci sagittis eu volutpat. Ultrices sagittis orci a scelerisque purus semper eget. Purus sit amet volutpat consequat mauris nunc congue nisi. Feugiat pretium nibh ipsum consequat nisl vel pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc. Condimentum id venenatis a condimentum vitae. At in tellus integer feugiat scelerisque varius morbi. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Ultrices in iaculis nunc sed augue lacus viverra. Purus faucibus ornare suspendisse sed nisi. Sem nulla pharetra diam sit. Accumsan lacus vel facilisis volutpat est velit. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Aenean euismod elementum nisi quis eleifend quam adipiscing.",
          price: 1550,
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
