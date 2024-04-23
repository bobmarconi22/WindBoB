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
          email: "demo@user.io",
          firstName: "John",
          lastName: "User",
          username: "demo_user",
          hashedPassword: bcrypt.hashSync("password1"),
        },
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
