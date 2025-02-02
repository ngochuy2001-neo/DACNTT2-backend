const Category = require("../models/category.model");

class CategoryController {
  async show(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.log(error);
    }
  }
  async create(req, res) {
    try {
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      console.log(error);
    }
  }
  async change(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.log(error);
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({
        message: "Category delete successfully",
        data: deletedCategory,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoryController();
