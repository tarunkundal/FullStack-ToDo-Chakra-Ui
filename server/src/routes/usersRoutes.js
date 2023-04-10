const express = require("express");
const {
  register,
  login,
  signout,
  profileUpdate,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

// signout
router.get("/signout", authMiddleware, signout);

// profile update
router.put("/profile/update", authMiddleware, profileUpdate);

module.exports = router;
