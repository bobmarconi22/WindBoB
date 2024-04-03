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

async function findAvgStars(...spots) {
  spots = spots.flat();
  for (const spot of spots) {
    spot.dataValues.avgRating = 0;
    const reviews = await Review.findAll({
      where: { spotId: spot.id },
    });
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    if (totalStars / reviews.length) {
      spot.dataValues.avgRating = totalStars / reviews.length;
    }
  }
}

router.get("/", async (_req, res, next) => {
  try {
    const spots = await Spot.findAll();
    await findAvgStars(spots);

    for (const spot of spots) {
      const spotImages = await SpotImage.findAll({
        where: {
          id: spot.id,
          preview: true,
        },
      });
      if (spotImages.length === 0) {
        spot.dataValues.previewImage = null;
      } else {
        spot.dataValues.previewImage = spotImages[0].dataValues.url;
      }
    }

    res.json({ Spots: spots });
  } catch (error) {
    next(error);
  }
});

router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  try {
    const spots = await Spot.findAll({
      where: {
        ownerId: user.id,
      },
    });

    findAvgStars(spots);

    for (const spot of spots) {
      const spotImages = await SpotImage.findAll({
        where: {
          id: spot.id,
          preview: true,
        },
      });
      if (spotImages.length === 0) {
        spot.dataValues.previewImage = null;
      } else {
        spot.dataValues.previewImage = spotImages[0].dataValues.url;
      }
    }

    res.json({ Spots: spots });
  } catch (error) {
    next(error);
  }
});

router.get("/:spotId", handleValidationErrors, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!spot) {
    let err = new Error();
    (err.message = "Spot couldn't be found"), (err.status = 404);
    throw err;
  }

  const reviews = await Review.findAll({
    where: {
      spotId: spot.id,
    },
  });

  spot.dataValues.numReviews = reviews.length;
  await findAvgStars(spot);
  res.json(spot);
});

router.post("/", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const err = new Error();
  err.errors = {};
  if (typeof address !== "string" || address.length === 0) {
    err.errors.address = "Street address is required";
    err.status = 400;
  }
  if (typeof city !== "string" || city.length === 0) {
    err.errors.city = "City is required";
    err.status = 400;
  }
  if (typeof state !== "string" || state.length === 0) {
    err.errors.state = "State is required";
    err.status = 400;
  }
  if (typeof country !== "string" || country.length === 0) {
    err.errors.country = "Country is required";
    err.status = 400;
  }
  if (typeof lat !== "number" || lat > 90 || lat < -90) {
    err.errors.lat = "Latitude must be within -90 and 90";
    err.status = 400;
  }
  if (typeof lat !== "number" || lng > 180 || lng < -180) {
    err.errors.lng = "Longitude must be within -180 and 180";
    err.status = 400;
  }
  if (typeof name !== "string" || name.length > 50) {
    err.errors.name = "Name must be less than 50 characters";
    err.status = 400;
  }
  if (typeof description !== "string" || description.length === 0) {
    err.errors.description = "Description is required";
    err.status = 400;
  }
  if (typeof price !== "number" || price < 0) {
    err.errors.price = "Price per day must be a positive number";
    err.status = 400;
  }
  if (err.status === 400) {
    err.message = "Bad Request";
    throw err;
  }

  let spot = await Spot.create({
    address: address,
    ownerId: userId,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });
  res.json(spot);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);

  if (isNaN(spotId) || spot < 1) {
    let err = new Error();
    (err.message = "Spot couldn't be found"), (err.status = 404);
    throw err;
  }

  const spot = await Spot.findAll({
    where: {
      id: spotId,
    },
  });

  if (!spot.length) {
    let err = new Error();
    (err.message = "Spot couldn't be found"), (err.status = 404);
    throw err;
  }

  const { url, preview } = req.body;
  const newImg = await SpotImage.create({
    spotId: spotId,
    url: url,
    preview: preview,
  });

  res.json(newImg);
});

router.put("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (isNaN(spotId) || spotId < 1) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  if (!spot) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  const errors = {};
  if (typeof address !== "string" || address.length === 0) {
    errors.address = "Street address is required";
  }
  if (typeof city !== "string" || city.length === 0) {
    errors.city = "City is required";
  }
  if (typeof state !== "string" || state.length === 0) {
    errors.state = "State is required";
  }
  if (typeof country !== "string" || country.length === 0) {
    errors.country = "Country is required";
  }
  if (typeof lat !== "number" || lat > 90 || lat < -90) {
    errors.lat = "Latitude must be within -90 and 90";
  }
  if (typeof lng !== "number" || lng > 180 || lng < -180) {
    errors.lng = "Longitude must be within -180 and 180";
  }
  if (typeof name !== "string" || name.length > 50) {
    errors.name = "Name must be less than 50 characters";
  }
  if (typeof description !== "string" || description.length === 0) {
    errors.description = "Description is required";
  }
  if (typeof price !== "number" || price < 0) {
    errors.price = "Price per day must be a positive number";
  }

  if (Object.keys(errors).length > 0) {
    const err = new Error("Bad Request");
    err.status = 400;
    err.errors = errors;
    throw err;
  }

  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.json(spot);
});

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);

  if (isNaN(spotId) || spotId < 1) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }
  if (spotId !== req.user.id) {
    let err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  await spot.destroy();

  res.json({ message: "Successfully deleted" });
});

router.get("/:spotId/reviews", async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      spotId: parseInt(req.params.spotId),
    },
    include: {
      model: ReviewImage,
      attributes: ["id", "url"],
    },
  });

  const spot = await Review.findByPk(parseInt(req.params.spotId));

  if (!spot) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  res.json({ Reviews: reviews });
});

router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;

  const spot = await Review.findByPk(parseInt(req.params.spotId));

  if (!spot) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
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

  const allReviews = await Review.findAll({
    where: {
      userId: parseInt(req.user.id),
    },
  });

  for (const review of allReviews) {
    if (review.spotId === parseInt(req.params.spotId)) {
      const err = new Error("User already has a review for this spot");
      err.status = 500;
      throw err;
    }
  }

  const newReview = await Review.create({
    userId: parseInt(req.user.id),
    spotId: parseInt(req.params.spotId),
    review: review,
    stars: stars,
  });

  res.json(newReview);
});

module.exports = router;
