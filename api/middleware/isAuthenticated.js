const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

require("dotenv").config();

const isAuthenticated = catchAsync(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // const token = req.headers.authorization?split("")[1]

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to access", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token Payload:", decoded);

    const { _id } = decoded;
    const currentUser = await User.findById(decoded.id || decoded._id);

    console.log("Decoded ID:", decoded.id);
    console.log("User Found in Database:", currentUser);

    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token doesn't exist", 401)
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return next(
      new AppError("Invalid or expired token. Please log in again.", 401)
    );
  }
});

module.exports = isAuthenticated;
