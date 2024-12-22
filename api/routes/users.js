// In your routes file (router.js)
const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

// Import the 'register', 'verifyAccount' function from the controller
const {
  register,
  verifyAccount,
  resentOTP,
  login,
  logout,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");

const isAuthenticated = require("../middleware/isAuthenticated");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controllers/userController");

// Import the middlewares correctly
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

router.post("/register", register);
router.post("/verify", isAuthenticated, verifyAccount);
router.post("/resent-otp", isAuthenticated, resentOTP);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, you are authenticated!");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and you can delete!");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello admin, you are logged in and you can delete all accounts");
});

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getAllUser);

module.exports = router;
