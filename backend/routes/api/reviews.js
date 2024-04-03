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

router.get("/current", requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"],
    },
  });

  if (reviews.length <= 0) {
    return res.json("No Reviews Yet!");
  }

  const spot = await Spot.findOne({
    where: {
      id: reviews[0].spotId,
    },
    attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
    ],
    include: [
      {
        model: SpotImage,
        as: "previewImage",
        where: {
          preview: true,
        },
        attributes: ["url"],
      },
    ],
  });

  const reviewImages = await ReviewImage.findAll({
    where: {
      reviewId: reviews[0].id,
    },
    attributes: ["id", "url"],
  });

  const formattedReviews = reviews.map((review) => {
    return {
      id: review.id,
      userId: review.User.id,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: {
        id: review.User.id,
        firstName: review.User.firstName,
        lastName: review.User.lastName,
      },
      Spot: {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        price: spot.price,
        previewImage:
          spot.previewImage.length > 0 ? spot.previewImage[0].url : null,
      },
      ReviewImages: reviewImages.map((image) => ({
        id: image.id,
        url: image.url,
      })),
    };
  });

  const payload = { Reviews: formattedReviews };

  res.json(payload);
});

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;

  const review = await Review.findByPk(parseInt(req.params.reviewId), {
    include: {
      model: ReviewImage,
    },
  });

  if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  }

  console.log(review.ReviewImages.length)
  if (review.ReviewImages.length === 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    throw err;
  }

  const newImg = await ReviewImage.create({
    reviewId: parseInt(req.params.reviewId),
    url: url,
  });

  const payload = {
    id: newImg.id,
    url: newImg.url,
  };

  res.json(payload);
});

module.exports = router;
