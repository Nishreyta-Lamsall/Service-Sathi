const CategoryModel = require("../models/CategoryModel");

const createCategory = async (req, res, next) => {
  const newCategory = new CategoryModel(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted.");
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const Category = await CategoryModel.findById(req.params.id);
    res.status(200).json(Category);
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const Category = await CategoryModel.find();
    res.status(200).json(Category);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
