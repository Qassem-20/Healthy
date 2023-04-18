const express = require("express");
const router = express.Router();

//limit trails access for the user
const rateLimiter = require("express-rate-limit");
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

//middleware
const requireAuth = require("../middleWares/requireAuth.js");

//exports from the controller
const {
  getUserProfile,
  registerUser,
  loginUser,
  logoutUser,
  checkAuthUser,
  updateUser,
} = require("../controllers/userControllers.js");

// auth / register / login / loguot - (post and get)
router.route("/registerUser").post(apiLimiter, registerUser);
router.route("/loginUser").post(apiLimiter, loginUser);
router.route("/checkAuthUser").get(requireAuth, checkAuthUser);
router.route("/logoutUser").get(logoutUser);

// (get) User Profile
router.route("/userProfile").get(requireAuth, getUserProfile);

//  (PUT) updateUser
router.route("/users/:id").put(requireAuth, updateUser);
module.exports = router;
