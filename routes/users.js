// PATH: api/users
const { Router } = require("express");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { getUsers } = require("../controllers/users");

const router = Router();

router.get("/", [jwtValidator], getUsers);

module.exports = router;
