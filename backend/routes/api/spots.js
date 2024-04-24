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
    if(!reviews.length){
      spot.dataValues.avgRating = undefined
    }
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    if (totalStars / reviews.length) {
      spot.dataValues.avgRating = totalStars / reviews.length;
    }
  }
}

router.get("/", async (req, res, next) => {
  let { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  // const defaultMinLat = -90;
  // const defaultMaxLat = 90;
  // const defaultMinLng = -180;
  // const defaultMaxLng = 180;
  // const defaultMinPrice = 0;
  // const defaultMaxPrice = Infinity;

  // minLat = minLat !== undefined ? minLat : defaultMinLat;
  // maxLat = maxLat !== undefined ? maxLat : defaultMaxLat;
  // minLng = minLng !== undefined ? minLng : defaultMinLng;
  // maxLng = maxLng !== undefined ? maxLng : defaultMaxLng;
  // minPrice = minPrice !== undefined ? minPrice : defaultMinPrice;
  // maxPrice = maxPrice !== undefined ? maxPrice : defaultMaxPrice;

  page = parseInt(page);
  size = parseInt(size);

  if (isNaN(page)) page = 1;
  if (page > 10) page = 10;
  if (isNaN(size) || size > 20) size = 20;

  // errors
  const err = new Error();
  err.errors = {};
  if (page < 1) {
    err.message = "Bad Request";
    err.errors.page = "Page must be greater than or equal to 1";
    err.status = 400;
  }
  if (size < 1) {
    err.message = "Bad Request";
    err.errors.size = "Size must be greater than or equal to 1";
    err.status = 400;
  }
  //   if (minLat > maxLat) {
  //     err.errors.minLat =
  //       "Minimum latitude cannot be greater than maximum latitude";
  //     err.errors.maxLat =
  //       "Maximum latitude cannot be less than minimum latitude";
  //     err.status = 400;
  //   }
  // if (minLat > 90 || minLat < -90) {
  //   err.errors.minLat = "Minimum latitude is invalid";
  //   err.status = 400;
  // }
  // if (maxLat > 90 || maxLat < -90) {
  //   err.errors.maxLat = "Maximum latitude is invalid";
  //   err.status = 400;
  // }
  //   if (minLng > maxLng) {
  //     err.errors.minLng =
  //       "Minimum longitude cannot be greater than maximum longitude";
  //     err.errors.maxLng =
  //       "Maximum longitude cannot be less than minimum longitude";
  //     err.status = 400;
  //   }
  // if (minLng > 180 || minLng < -180) {
  //   err.errors.minLng = "Minimum longitude is invalid";
  //   err.status = 400;
  // }
  // if (maxLng > 180 || maxLng < -180) {
  //   err.errors.maxLng = "Maximum longitude is invalid";
  //   err.status = 400;
  // }
  //   if (minPrice > maxPrice) {
  //     err.errors.minPrice =
  //       "Minimum price cannot be greater than maximum price";
  //     err.errors.maxPrice = "Maximum price cannot be less than minimum price";
  //   }

  // if (minPrice < 0) {
  //   err.errors.minPrice = "Minimum price must be greater than or equal to 0";
  //   err.status = 400;
  // }
  // if (maxPrice < 0) {
  //   err.errors.maxPrice = "Maximum price must be greater than or equal to 0";
  //   err.status = 400;
  // }
  if (err.status === 400) {
    throw err;
  };
  // where = {}
  // where.lat = {
  //   [Op.between]: [minLat, maxLat],
  // };
  // where.lng = {
  //   [Op.between]: [minLng, maxLng],
  // };
  // where.price = {
  //   [Op.between]: [minPrice, maxPrice],
  // };

  const spots = await Spot.findAll({
     limit: size,
     offset: size * (page - 1)
    });

  await findAvgStars(spots);

  for (const spot of spots) {
    const spotImages = await SpotImage.findAll({
      where: {
        id: spot.id,
        preview: true,
      },
    });
    if (spotImages.length === 0) {
      spot.dataValues.previewImage = "no image available";
    } else {
      spot.dataValues.previewImage = spotImages[0].dataValues.url;
    }
  }
for(const spot of spots){
  spot.dataValues.lat = parseFloat(spot.lat);
  spot.dataValues.lng = parseFloat(spot.lng);
  spot.dataValues.price = parseFloat(spot.price);
};


  res.json({ Spots: spots, page, size });
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
        spot.dataValues.previewImage = "no image available";
      } else {
        spot.dataValues.previewImage = spotImages[0].dataValues.url;
      }
    };

    for(const spot of spots){
      spot.dataValues.lat = parseFloat(spot.lat);
      spot.dataValues.lng = parseFloat(spot.lng);
      spot.dataValues.price = parseFloat(spot.price);
    };

    res.json({ Spots: spots });
  } catch (error) {
    next(error);
  }
});

router.get("/:spotId", async (req, res, next) => {
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
  const payload = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: parseFloat(spot.lat),
    lng: parseFloat(spot.lng),
    name: spot.name,
    description: spot.description,
    price: parseFloat(spot.price),
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews: spot.dataValues.numReviews,
    avgStarRating: spot.dataValues.avgRating,
    SpotImages: spot.SpotImages,
    Owner: spot.Owner,
  };
  res.json(payload);
});

router.post("/", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price, SpotImages } =
    req.body;

  const err = new Error();
  err.errors = {};
  if (!address || typeof address !== "string" || address.length === 0) {
    err.errors.address = "Street address is required";
    err.status = 400;
  };
  if (!city || typeof city !== "string" || city.length === 0) {
    err.errors.city = "City is required";
    err.status = 400;
  };
  if (!state || typeof state !== "string" || state.length === 0) {
    err.errors.state = "State is required";
    err.status = 400;
  };
  if (!country || typeof country !== "string" || country.length === 0) {
    err.errors.country = "Country is required";
    err.status = 400;
  };
  if (!lat || typeof lat !== "number" || lat > 90 || lat < -90) {
    err.errors.lat = "Latitude must be within -90 and 90";
    err.status = 400;
  };
  if (!lng || typeof lng !== "number" || lng > 180 || lng < -180) {
    err.errors.lng = "Longitude must be within -180 and 180";
    err.status = 400;
  };
  if (!name || typeof name !== "string"){
    err.errors.name = "Name is required";
    err.status = 400;
  };
  if (name.length > 50) {
    err.errors.name = "Name must be less than 50 characters";
    err.status = 400;
  };
  if (
    !description ||
    typeof description !== "string" ||
    description.length < 30
  ) {
    err.errors.description = "Description must be at least 30 characters";
    err.status = 400;
  };
  if (!price || typeof price !== "number" || price < 0) {
    err.errors.price = "Price per day must be a positive number";
    err.status = 400;
    console.log('======================================>',SpotImages[0] === '')
  };
  if(SpotImages[0].url === ''){
    err.errors.SpotImages = "At least one image is required"
    err.status = 400
  };
  if (err.status === 400) {
    err.message = "Bad Request";
    throw err;
  };




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

  for (let i = 0; i > SpotImages.length; i++){
    await SpotImages.create({
      spotId: spot.id,
      url: SpotImages[i].url,
      previewImage: i === 0
  })

  }

  spot.dataValues.lat = parseFloat(spot.lat);
  spot.dataValues.lng = parseFloat(spot.lng);
  spot.dataValues.price = parseFloat(spot.price);

  res.status(201).json(spot);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);

  if (isNaN(spotId) || spotId < 1) {
    let err = new Error();
    (err.message = "Spot couldn't be found"), (err.status = 404);
    throw err;
  };

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    let err = new Error();
    err.message = "Spot couldn't be found";
    err.status = 404;
    throw err;
  }

  if (spot.ownerId !== req.user.id) {
    let err = new Error();
    err.message = "Forbidden";
    err.status = 403;
    throw err;
  }

  const { url, preview } = req.body;
  const newImg = await SpotImage.create({
    spotId: spotId,
    url: url,
    preview: preview,
  });

  const payload = {
    id: newImg.id,
    url: newImg.url,
    preview: newImg.preview,
  };

  res.json(payload);
});

router.put("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);
  const { address, city, state, country, lat, lng, name, description, price, previewImageUrl } =
    req.body;

  if (isNaN(spotId) || spotId < 1) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  if (spot.ownerId !== req.user.id) {
    let err = new Error();
    err.message = "Forbidden";
    err.status = 403;
    throw err;
  }

  const errors = {};
  if (!address || typeof address !== "string" || address.length === 0) {
    errors.address = "Street address is required";
  }
  if (!city || typeof city !== "string" || city.length === 0) {
    errors.city = "City is required";
  }
  if (!state || typeof state !== "string" || state.length === 0) {
    errors.state = "State is required";
  }
  if (!country || typeof country !== "string" || country.length === 0) {
    errors.country = "Country is required";
  }
  if (!lat || typeof lat !== "number" || lat > 90 || lat < -90) {
    errors.lat = "Latitude must be within -90 and 90";
  }
  if (!lng || typeof lng !== "number" || lng > 180 || lng < -180) {
    errors.lng = "Longitude must be within -180 and 180";
  }
  if (!name || typeof name !== "string" || name.length > 50) {
    errors.name = "Name must be less than 50 characters";
  }
  if (
    !description ||
    typeof description !== "string" ||
    description.length === 0
  ) {
    errors.description = "Description is required";
  }
  if (!price || typeof price !== "number" || price < 0) {
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

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  if (spot.ownerId !== req.user.id) {
    let err = new Error("Forbidden");
    err.status = 403;
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
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
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
  const spotId = parseInt(req.params.spotId);

  if (isNaN(spotId) || spotId < 1) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

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

  res.status(201).json(newReview);
});

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);

  if (isNaN(spotId) || spotId < 1) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    let err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  if (spot.ownerId === req.user.id) {
    const bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });

    res.json({ Bookings: bookings });
  } else {
    const bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });
    res.json({ Bookings: bookings });
  }
});

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spotId = parseInt(req.params.spotId);
  const { startDate, endDate } = req.body;
  if (isNaN(spotId) || spotId < 1) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  if (req.user.id === spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  const currentDate = new Date();

  if (
    !startDate ||
    !endDate ||
    new Date(startDate) < currentDate ||
    new Date(startDate) >= new Date(endDate)
  ) {
    const err = new Error();
    err.errors = {};
    if (!startDate) {
      err.errors.startDate = "Start Date is Required";
      err.status = 400;
    }
    if (!endDate) {
      err.errors.endDate = "End Date is Required";
      err.status = 400;
    }
    if (new Date(startDate) < currentDate) {
      err.errors.startDate = "startDate cannot be in the past";
      err.status = 400;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      err.errors.endDate = "endDate cannot be on or before startDate";
      err.status = 400;
    }
    throw err;
  }

  const spotBookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
  });

  for (const booking of spotBookings) {
    const err = new Error();
    err.errors = {};
    if (
      new Date(startDate) <= booking.endDate &&
      new Date(startDate) >= booking.startDate
    ) {
      err.message =
        "Sorry, this spot is already booked for the specified dates";
      err.errors.startDate = "Start date conflicts with an existing booking";
      err.status = 403;
    }
    if (
      new Date(endDate) <= booking.endDate &&
      new Date(endDate) >= booking.startDate
    ) {
      err.message =
        "Sorry, this spot is already booked for the specified dates";
      err.errors.endDate = "End date conflicts with an existing booking";
      err.status = 403;
    }

    if (
      booking.startDate < new Date(endDate) &&
      booking.startDate > new Date(startDate) &&
      booking.endDate < new Date(endDate) &&
      booking.endDate > new Date(startDate)
    ) {
      err.message =
        "Sorry, this spot is already booked for the specified dates";
      err.errors.middleDates = `A Booking or bookings exist from within your desired time frame.`;
      err.status = 403;
    }
    if (err.status === 403) {
      throw err;
    }
  }

  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate,
  });

  res.json(newBooking);
});

module.exports = router;
