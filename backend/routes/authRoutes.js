// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/authController");
// // const authenticateToken = require("../controllers/authMiddleware");


// // Public route for login
// router.post("/login", loginUser);

// //Public route for registration
// router.post("/register", registerUser);

// // Protected route for tasks

// //authenticateToken
// router.get("/tasks", (req, res) => {
//   // Now req.user contains the authenticated user's data
//   res.json({ message: "Here are your tasks" });
// });

// module.exports = router;


// authRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Public route for registration
router.post("/register", registerUser);

// Public route for login
router.post("/login", loginUser);

module.exports = router;
