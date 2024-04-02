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
  spots = spots[0];
  for (const spot of spots) {
    const reviews = await Review.findAll({
      where: { spotId: spot.dataValues.id },
    });
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    spot.dataValues.avgRating = totalStars / reviews.length;
  }
}

async function findPrevImg(...spots) {
  spots = spots[0];
  for (const spot of spots) {
    const prevImage = await SpotImage.findAll({
      where: {
        id: spot.dataValues.id,
        preview: true,
      },
    });
    spot.dataValues.previewImage = prevImage[0].dataValues.url;
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

    res.json(spots);
  } catch (error) {
    next(error);
  }
});

// async function findAvgStars (id){
//   const reviews = await Review.findAll({
//     where: {
//       id: id
//     }
//   });
//   let sum = 0
//   let count = 0
//   reviews.forEach(review => {
//     sum += review.stars;
//     count++
//   })
//   return sum / count
// }
// router.get("/", async (_req, res, next) => {
//   try {
//       const spots = await Spot.findAll();

//       for(const spot of spots) {
//         spot.avgRating = await findAvgStars(spot.id);
//         console.log(spot.avgRating);
//       }

//       res.json(spots);
//   } catch (error) {
//       next(error);
//   }
// });

// router.get("/", async (_req, res, next) => {
//   try {
//       const spots = await Spot.findAll({
//           include: [
//               {
//                   model: Review,
//                   attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
//               },
//               {
//                   model: SpotImage,
//                   attributes: [['url', 'previewImage']],
//                   where: {
//                       preview: true
//                   }
//               }
//           ]
//       });

//       console.log(spots);
//       res.json(spots);
//   } catch (error) {
//       next(error);
//   }
// });

router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  try {
    const spots = await Spot.findAll({
      where: {
        ownerId: user.id,
      },
    });
    for (const spot of spots) {
      const reviews = await Review.findAll({
        where: { spotId: spot.id },
      });
      const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
      if (reviews.length === 0) {
        spot.dataValues.avgRating = 0;
      } else {
        spot.dataValues.avgRating = totalStars / reviews.length;
      }
    }

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

    res.json(spots);
  } catch (error) {
    next(error);
  }
});

router.get("/:spotId", handleValidationErrors, async (req, res, next) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findAll({
    where: {
      id: spotId,
    },
    include: [
      {
        model: SpotImage,
      },
      {
        model: User,
        as: "Owner",
      },
    ],
  });
  if (!spot.length) {
    throw new Error("Spot couldn't be found");
  }
  await findAvgStars(spot);
  res.json(spot);
});

router.post("/", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
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

module.exports = router;
