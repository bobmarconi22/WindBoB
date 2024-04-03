const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
} = require("../../db/models");

const router = express.Router();
// backend/routes/api/users.js
// ...
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// ...

// backend/routes/api/users.js
// ...
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("username is required"),
  check("username")
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors,
];
// backend/routes/api/users.js
// ...
// backend/routes/api/users.js
// ...

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const checkEmail = await User.findOne({
    where: {
      email: email,
    },
  });

  const checkUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (checkEmail || checkUser) {
    const err = new Error("User already exists");
    err.status = 500;
    err.errors = {};
    if (checkEmail) err.errors.email = "User with that email already exists";
    if (checkUser) err.errors.email = "User with that username already exists";
    throw err;
  };

  const user = await User.create({
    email,
    firstName,
    lastName,
    username,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});
// Sign up
// router.post(
//   '/',
//   async (req, res) => {
//     const { email, password, username } = req.body;
//     const hashedPassword = bcrypt.hashSync(password);
//     const user = await User.create({ email, username, hashedPassword });

//     const safeUser = {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//       user: safeUser
//     });
//   }
// );

module.exports = router;
