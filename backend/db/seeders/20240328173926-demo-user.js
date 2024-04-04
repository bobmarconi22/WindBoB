"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "owner@user.io",
          firstName: "First1",
          lastName: "Last1",
          username: "owns-and-books-spots",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //! I have set up my seeders so that you only need to log into user 1 to check all endpoints. User 1: owns spots, books from user 2's spots, user 3 is to check proper validations.
        {
          email: "consumer@user.io",
          firstName: "First2",
          lastName: "Last2",
          username: "books-spots",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "otherConsum@user.io",
          firstName: "First3",
          lastName: "Last3",
          username: "check-validations",
          hashedPassword: bcrypt.hashSync("password3"),
        }
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
