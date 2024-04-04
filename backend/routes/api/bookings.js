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
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: {
      model: Spot,
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
      include: {
        model: SpotImage,
        attributes: ["url"],
        where: {
          preview: true,
        },
      },
    },
  });
if(!bookings.length){
    res.json('No Bookings Yet!')
};
  const payload = bookings.map((booking) => {
    return {
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage:
          booking.Spot.SpotImages.length > 0
            ? booking.Spot.SpotImages[0].url
            : null,
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  });

  res.json({ Bookings: payload });
});

module.exports = router;
