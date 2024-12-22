const express = require("express");
const CategoryModel = require("../models/CategoryModel");
const createError = require("../utils/error.js");
const { updateCategory, deleteCategory, createCategory, getCategory, getAllCategory } = require("../controllers/categoryController.js");

const router = express.Router();

//CREATE
router.post("/", createCategory);

//UPDATE
router.put("/:id", updateCategory);

//DELETE
router.delete("/:id", deleteCategory);

//GET
router.get("/:id", getCategory);

//GET ALL
router.get("/", getAllCategory);

module.exports = router;
