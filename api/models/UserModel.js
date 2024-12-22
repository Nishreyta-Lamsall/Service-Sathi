const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false, // Password will not be included in query results unless explicitly selected
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm password"],
      validate: {
        validator: function (confirmPass) {
          return confirmPass === this.password; // Ensures passwords match
        },
        message: "Passwords don't match.",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false, // Indicates whether the user's email is verified
    },
    otp: {
      type: String,
      default: null, // Stores an OTP for email verification
    },
    otpExpires: {
      type: Date,
      default: null, // Expiry time for the OTP
    },
    resetPasswordOTP: {
      type: String,
      default: null, // OTP for resetting the password
    },
    resetPasswordOTPExpires: {
      type: Date,
      default: null, // Expiry time for the reset password OTP
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp of when the user was created
    },
  },
  {
    timestamps: true, // Adds 'createdAt' and 'updatedAt' fields automatically
  }
);

//This gets run before saving the user data to the database
userSchema.pre("save", async function (next) {
  // Check if the password has been modified (i.e., updated or newly set)
  if (!this.isModified("password"))
    // If the password hasn't been modified, skip the next steps and continue saving the user data
    return next(); // Proceed to the save operation

  // If the password has been modified or is new, we proceed to hash (encrypt) it before saving
  this.password = await bcrypt.hash(this.password, 12);

  // The 'confirmPassword' field should not be saved in the database, so we set it to undefined
  // It's just used for validation, not for storage
  this.confirmPassword = undefined;

  next();
});

//comparing the password sent to us to the password set in the database
userSchema.methods.correctPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
