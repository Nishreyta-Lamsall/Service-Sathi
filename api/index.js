const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const CategoriesRoute = require("./routes/categories");
const ServicesRoute = require("./routes/services");
const UsersRoute = require("./routes/users");
const cors = require("cors");

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use(express.json());

// Middlewares
app.use("/api/v1/categories", CategoriesRoute);
app.use("/api/v1/auth", ServicesRoute);
app.use("/api/v1/users", UsersRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.statusCode || 500; // Use statusCode instead of status
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Server is listening on port 8000");
});
