const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


router.get("/", async (_req, res, next) => {
    const spots = await Spot.findAll();

    res.json(spots)
});

router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req
        const spots = await Spot.findAll({
        where: {
            ownerId: user.dataValues.id
        },
        include: [{
            model: Review,
            attributes: ['stars']
        },
        {
            model: SpotImage,
            attributes: ['preview']
        }]
    });
    res.json(spots)
});

router.get("/:spotId", async (req, res, next) => {
    const spotId = req.params.spotId
        const spots = await Spot.findAll({
        where: {
            id: spotId
        }
    });
    res.json(spots)
});

router.post("/", requireAuth, async (req, res, next) => {
    const { user } = req
        const spots = await Spot.create(req.body);
    res.json(spots)
});

module.exports = router
