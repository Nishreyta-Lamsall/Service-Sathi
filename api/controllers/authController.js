const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const generateOtp = require("../utils/generateOtp");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

require("dotenv").config();

// Helper function to generate a JWT token
const signToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Helper function to create and send the token to the user
const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user); // Generate JWT token

  // Hide sensitive fields
  user.password = undefined;
  user.passwordConfirm = undefined;
  user.otp = undefined;

  // Send response with token and user data
  res.status(statusCode).json({
    status: "success",
    message,
    token, // Return the token directly
    data: {
      user,
    },
  });
};

// Signup
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) return next(new AppError("Email already exists", 400));

  // Generate OTP and set expiry
  const otp = generateOtp();
  const otpExpires = Date.now() + 24 * 60 * 60 * 1000; // OTP expires in 24 hours

  // Create the new user
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
    otp,
    otpExpires,
  });

  // Send OTP via email
  try {
    await sendEmail({
      email: newUser.email,
      subject: "OTP for email verification.",
      html: `<h1>Your OTP is: ${otp}</h1>`,
    });

    createSendToken(newUser, 200, res, "Registration Successful!");
  } catch (error) {
    // If email fails, delete the user and handle the error
    await User.findByIdAndDelete(newUser.id);
    console.error("Email sending error:", error); // Log the error for debugging
    return next(
      new AppError(
        "There was an error sending the email. Please try again.",
        500
      )
    );
  }
});

// Verification
exports.verifyAccount = catchAsync(async (req, res, next) => {
  const { otp } = req.body;

  if (!otp) {
    return next(new AppError("Otp is missing", 400));
  }

  // Middleware to get currently logged in user
  const user = req.user;

  // Check if the provided OTP matches the one saved in the database
  if (user.otp !== otp) {
    return next(new AppError("Invalid OTP", 400));
  }

  if (Date.now() > user.otpExpires) {
    return next(new AppError("OTP has expired. Please request a new OTP", 400));
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res, "Email has been verified.");
});

// Resend OTP
exports.resentOTP = catchAsync(async (req, res, next) => {
  const { email } = req.user;

  if (!email) {
    return next(new AppError("Email is required to resend OTP", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isVerified) {
    return next(new AppError("This account is already verified", 400));
  }

  const newOtp = generateOtp();
  user.otp = newOtp;
  user.otpExpires = Date.now() + 24 * 60 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Resent OTP for email verification",
      html: `<h1>Your New OTP is ${newOtp}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "A new OTP has been sent to your email",
    });
  } catch (error) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email. Please try again.",
        500
      )
    );
  }
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Find user and explicitly select the password field
  const user = await User.findOne({ email }).select("+password");

  // Check if user exists and if the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Check if the user is verified
  if (!user.isVerified) {
    return res.status(403).json({
      status: "fail",
      message:
        "Your account is not verified. Please verify your email before logging in.",
      redirect: "/verifyaccount",
    });
  }

  // Generate JWT token
  const token = signToken(user);

  // Return user details excluding sensitive information
  const { isAdmin, ...otherDetails } = user._doc;

  // Send response with token and user data
  res.status(200).json({
    status: "success",
    message: "Login successful",
    token,
    data: otherDetails,
  });
});

 // localstorage.getItem()
  // localstorage.setitem('token, "")
  // localstorage.removeItem()
  
// Logout
// Removing cookie from the browser
exports.logout = catchAsync(async (req, res, next) => {
 
  res.cookie("access_token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    message: "Log Out Successful!",
  });
});

// Forget password
exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("No user found", 404)); // Ensure we pass the error to the next middleware
  }

  const otp = generateOtp();

  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpires = Date.now() + 300000; // 5 minutes

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password Reset OTP (Valid for 5 minutes)",
      html: `<h1>Your password reset OTP ${otp}</h1>`,
    });

    res.status(200).json({
      status: "Success",
      message: "Password reset OTP has been sent to your email.",
    });
  } catch (error) {
    // Reset OTP in case of error while sending email
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Please try again")
    );
  }
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, password, confirmPassword } = req.body;

  // Validate OTP and check expiry
  const user = await User.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordOTPExpires: { $gt: Date.now() }, // Ensure OTP is still valid
  });

  if (!user) return next(new AppError("Invalid OTP or OTP expired", 400));

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  // Update the password
  user.password = password;
  user.confirmPassword = confirmPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpires = undefined;

  await user.save();

  createSendToken(user, 200, res, "Password reset successfully!");
});
