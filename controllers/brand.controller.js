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
      console.log(req.body);
      const newBrand = new Brand(req.body);
      const savedBrand = await newBrand.save();
      res.status(201).json(savedBrand);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BrandController();
