const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  type:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true, 
  },
  image: {
    type: String, 
  },
  services: {
    type: [String]
  },
  cheapestServicePrice:{
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
