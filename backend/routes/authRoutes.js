const express = require("express");
const { register, login, validateRegister , validateLogin } = require("../controllers/authController");
// const { validateRegister, validateLogin } = require("../middlewares/validators");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin , login);

module.exports = router;
    