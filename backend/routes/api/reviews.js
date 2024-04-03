const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
} = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// router.get('/current', requireAuth, (req, res, next) => {
//     const reviews = await Reviews.findAll({
//         where: {
//             userId: req.user.id
//         },
//         include: [Spot, ReviewImage]
//     })
// })

module.exports = router;
