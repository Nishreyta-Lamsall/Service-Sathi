const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference Category
    ref: "Category",
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  Provider: {
    type: mongoose.Schema.Types.ObjectId, // Reference ServiceProvider
    ref: "ServiceProvider",
    required: true,
  },
  providerRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  cheapestService: {
    type: Number,
    required: true,
  },
  LatestPicks: {
    type: Boolean,
    default: false,
  },
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
