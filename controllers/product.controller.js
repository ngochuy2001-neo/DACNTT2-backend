const Cellphone = require("../models/cellphone.model");
const Laptop = require("../models/laptop.model");
const CellphoneVariant = require("../models/cellphonevariant.model");
const LaptopVariant = require("../models/laptopvariant.model");
class ProductController {
  async create(req, res) {
    try {
      const { type } = req.body;
      let newProduct;

      if (type === "cellphone") {
        newProduct = new Cellphone(req.body);
      } else if (type === "laptop") {
        newProduct = new Laptop(req.body);
      } else {
        return res.status(400).json({ message: "Invalid product type" });
      }

      await newProduct.save();
      return res
        .status(201)
        .json({ message: `${type} created successfully`, product: newProduct });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error creating product", error: err });
    }
  }

  async getAll(req, res) {
    try {
      const { type } = req.query;

      if (type === "cellphone") {
        const products = await Cellphone.find();
        return res.status(200).json(products);
      } else if (type === "laptop") {
        const products = await Laptop.find();
        return res.status(200).json(products);
      } else {
        return res.status(400).json({ message: "Invalid product type" });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error fetching products", error: err });
    }
  }

  async getOne(req, res) {
    try {
      const { type, id } = req.params;

      let product;
      if (type === "cellphone") {
        product = await Cellphone.findById(id);
      } else if (type === "laptop") {
        product = await Laptop.findById(id);
      } else {
        return res.status(400).json({ message: "Invalid product type" });
      }

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error fetching product", error: err });
    }
  }

  async update(req, res) {
    try {
      const { type, id } = req.params;
      let updatedProduct;

      if (type === "cellphone") {
        updatedProduct = await Cellphone.findByIdAndUpdate(id, req.body, {
          new: true,
        });
      } else if (type === "laptop") {
        updatedProduct = await Laptop.findByIdAndUpdate(id, req.body, {
          new: true,
        });
      } else {
        return res.status(400).json({ message: "Invalid product type" });
      }

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: `${type} updated successfully`,
        product: updatedProduct,
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error updating product", error: err });
    }
  }

  async delete(req, res) {
    try {
      const { type, id } = req.params;
      let deletedProduct;

      if (type === "cellphone") {
        deletedProduct = await Cellphone.findByIdAndDelete(id);
      } else if (type === "laptop") {
        deletedProduct = await Laptop.findByIdAndDelete(id);
      } else {
        return res.status(400).json({ message: "Invalid product type" });
      }

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: `${type} deleted successfully` });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error deleting product", error: err });
    }
  }

  async addVariant(req, res) {
    try {
      const { type, productId } = req.params;
      const { variantData } = req.body;

      let newVariant;

      if (type === "cellphone") {
        newVariant = new CellphoneVariant({
          product_id: productId,
          ...variantData,
        });
      } else if (type === "laptop") {
        newVariant = new LaptopVariant({
          product_id: productId,
          ...variantData,
        });
      } else {
        return res.status(400).json({ message: "Invalid product type" });
      }

      await newVariant.save();
      return res.status(201).json({
        message: `${type} variant created successfully`,
        variant: newVariant,
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error adding variant", error: err });
    }
  }

  async deleteVariant(req, res) {
    try {
      const { type, variantId } = req.params;
      let deletedVariant;

      if (type === "cellphone") {
        deletedVariant = await CellphoneVariant.findByIdAndDelete(variantId);
      } else if (type === "laptop") {
        deletedVariant = await LaptopVariant.findByIdAndDelete(variantId);
      } else {
        return res.status(400).json({ message: "Invalid product type" });
      }

      if (!deletedVariant) {
        return res.status(404).json({ message: "Variant not found" });
      }

      return res
        .status(200)
        .json({ message: `${type} variant deleted successfully` });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Error deleting variant", error: err });
    }
  }
}

module.exports = new ProductController();
