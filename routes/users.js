const express = require("express");
const { login, register, current } = require("../controllers/users");
const { auth } = require("../middleware/auth");
const router = express.Router();

/* POST /api/user/login */
router.post("/login", login);

/* POST /api/user/register */
router.post("/register", register);

/* GET /api/user/current */
router.get("/current", auth, current);

module.exports = router;
