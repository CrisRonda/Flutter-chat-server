// PATH: api/login
const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");

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
    check("email", "Email required").isEmail().withMessage("Email not valid"),
    check("password", "Password required")
      .isLength({ min: 5 })
      .withMessage("Password min lenght 5")
      .isLength({ max: 8 })
      .withMessage("Password max lenght 8"),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", [jwtValidator], renewToken);

module.exports = router;
