const jwt = require("jsonwebtoken");
const createError = require("../utils/error.js");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user; // Attach user info to the request object
    next(); // Proceed to the next middleware
  });
};

// Middleware to verify if the user is allowed to perform the action
const verifyUser = (req, res, next) => {
  // Call the verifyToken middleware first to ensure the user is authenticated
  verifyToken(req, res, () => {
    // Check if the user is the same as the one in the request params
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); // User is authorized, proceed to the next handler
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next(); 
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};



module.exports = { verifyToken, verifyUser , verifyAdmin };
