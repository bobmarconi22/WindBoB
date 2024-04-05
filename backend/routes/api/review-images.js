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

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = parseInt(req.params.imageId);

  if (isNaN(imageId) || imageId < 1) {
    let err = new Error("Review Image couldn't be found");
    err.status = 404;
    throw err;
  }

  const image = await ReviewImage.findByPk(imageId);

  if (!image) {
    let err = new Error("Review Image couldn't be found");
    err.status = 404;
    throw err;
  };

  const review = await Review.findByPk(image.reviewId);
  if (req.user.id !== review.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  image.destroy()

  res.json({"message": "Successfully deleted"})
})

module.exports = router
