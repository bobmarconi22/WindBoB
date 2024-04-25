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
          firstName: "DemoUser",
          lastName: "LastName",
          username: "demo_user",
          hashedPassword: bcrypt.hashSync("password321"),
        },
        {
          email: "joe@user.io",
          firstName: "Joe",
          lastName: "Schmoe",
          username: "spot-owner",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "alphonso@user.io",
          firstName: "Alphonso",
          lastName: "Briggs",
          username: "a-briggs",
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
