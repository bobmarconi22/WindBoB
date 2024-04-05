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
  });

  if (!bookings.length) {
    res.json("No Bookings Yet!");
  }

  const payload = [];

  for (const booking of bookings) {
    const spot = await Spot.findByPk(booking.spotId, {
      include: {
        model: SpotImage,
      },
    });
    let instance = {
      id: booking.id,
      spotId: booking.spotId,
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
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
    payload.push(instance);
  }

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
      }
      if (err.status === 403) {
        throw err;
      }
    }
  }

  editBooking.update({
    startDate: startDate,
    endDate: endDate,
  });

  res.json(editBooking);
});

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = parseInt(req.params.bookingId);

  if (isNaN(bookingId) || bookingId < 1) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    throw err;
  }

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    throw err;
  }

  const spot = await Spot.findByPk(booking.spotId);

  if (req.user.id !== booking.userId && req.user.id !== spot.ownerId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  if (booking.startDate < new Date()) {
    const err = new Error("Bookings that have been started can't be deleted");
    err.status = 403;
    throw err;
  }

  booking.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
