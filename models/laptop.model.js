const Product = require("./product.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopSchema = new Schema({
  cpu_brand: String,
  vga_brand: String,
  size: String,
});

module.exports = Product.discriminator("Laptop", LaptopSchema);
