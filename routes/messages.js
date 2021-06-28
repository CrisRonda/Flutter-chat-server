// PATH: api/messages
const { Router } = require("express");
const { getMessagesByUidReceiver } = require("../controllers/messajes");
const { jwtValidator } = require("../middlewares/jwtValidator");

const router = Router();

router.get("/:uidReceiver", [jwtValidator], getMessagesByUidReceiver);

module.exports = router;
