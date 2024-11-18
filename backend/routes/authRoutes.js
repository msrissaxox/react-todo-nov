// authRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Public route for registration
router.post("/register", registerUser);

// Public route for login
router.post("/login", loginUser);

module.exports = router;
