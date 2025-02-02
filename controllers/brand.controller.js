const Brand = require("../models/brand.model");

class BrandController {
  async show(req, res) {
    try {
      const brands = await Brand.find();
      res.json(brands);
    } catch (error) {
      console.log(error);
    }
  }
  async create(req, res) {
    try {
      const newBrand = new Brand(req.body);
      const savedBrand = await newBrand.save();
      res.status(201).json(savedBrand);
    } catch (error) {
      console.log(error);
    }
  }
  async change(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedBrand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json(updatedBrand);
    } catch (error) {
      console.log(error);
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedBrand = await Brand.findByIdAndDelete(id);
      if (!deleteBrand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json({ message: "Brand delete successfully", data: deletedBrand });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BrandController();
