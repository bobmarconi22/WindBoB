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
          hashedPassword: bcrypt.hashSync("password12321"),
        },
        {
          email: "user@user.io",
          firstName: "Saul",
          lastName: "Goodman",
          username: "owner123",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "jim@user.io",
          firstName: "Jim",
          lastName: "Tailor",
          username: "owner6",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "owner36912@user.io",
          firstName: "Alphonso",
          lastName: "Briggs",
          username: "owner45",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "onlyReviews@user.io",
          firstName: "Karen",
          lastName: "Malarkey",
          username: "reviewer",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "Scarn@user.io",
          firstName: "Michael",
          lastName: "Scott",
          username: "scarnman",
          hashedPassword: bcrypt.hashSync("password4"),
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
