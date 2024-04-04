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
  if (!bookings.length) {
    res.json("No Bookings Yet!");
  }
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

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = parseInt(req.params.bookingId);
  const { startDate, endDate } = req.body;

  if (isNaN(bookingId) || bookingId < 1) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    throw err;
  }

  const editBooking = await Booking.findByPk(bookingId);

  if (!editBooking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    throw err;
  }

  if (req.user.id !== editBooking.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  const currentDate = new Date();

  if (
    editBooking.startDate < currentDate &&
    editBooking.endDate < currentDate
  ) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    throw err;
  }

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
      spotId: editBooking.spotId,
    },
  });

  for (const booking of spotBookings) {

    console.log(booking.id, editBooking.id, booking, editBooking)
    if (booking.id !== editBooking.id) {
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
      };
      if (err.status === 403) {
        throw err;
      }
    }
  };

  editBooking.update({
    startDate: startDate,
    endDate: endDate,
  });

  res.json(editBooking);
});

module.exports = router;
