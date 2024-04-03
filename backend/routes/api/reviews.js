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
  if (reviews[0].length <= 0) {
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
  console.log(spot.SpotImages.length);
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
          spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
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

  console.log(review.ReviewImages.length);
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

router.put("/:reviewId", requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;
  if (isNaN(parseInt(req.params.reviewId))) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  }
  const editReview = await Review.findByPk(parseInt(req.params.reviewId));

  if (!editReview) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  }

  if (editReview.userId !== parseInt(req.user.id)) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  let throwStars = false;
  let throwReview = false;

  if (!stars || stars > 5 || stars < 0 || typeof stars !== "number") {
    throwStars = true;
  }
  if (!review || typeof review !== "string") {
    throwReview = true;
  }
  if (throwReview || throwStars) {
    const err = new Error("Bad Request");
    err.errors = {};
    if (throwReview) err.errors.review = "Review text is required";
    if (throwStars) err.errors.stars = "Stars must be an integer from 1 to 5";
    err.status = 400;
    throw err;
  }

  editReview.update({
    review: review,
    stars: stars,
  });

  res.json(editReview);
});

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const reviewId = parseInt(req.params.reviewId);

  if (isNaN(reviewId) || reviewId < 1) {
    let err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  };

  const review = await Review.findByPk(reviewId);

  if (!review) {
    let err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  };

  if (review.userId !== parseInt(req.user.id)) {
    let err = new Error("Forbidden");
    err.status = 403;
    throw err;
  };

  await review.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
