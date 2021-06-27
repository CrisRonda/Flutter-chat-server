// PATH: api/login
const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { createUser, loginUser } = require("./controllers/auth");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name required").not().isEmpty(),
    check("password", "password required")
      .isLength({ min: 5 })
      .withMessage("Password min lenght 5")
      .isLength({ max: 8 })
      .withMessage("Password max lenght 8"),
    check("email", "email required").isEmail(),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("password", "password required")
      .isLength({ min: 5 })
      .withMessage("Password min lenght 5")
      .isLength({ max: 8 })
      .withMessage("Password max lenght 8"),
    check("email", "email required").isEmail(),
    fieldValidator,
  ],
  loginUser
);

module.exports = router;
