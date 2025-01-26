const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product.model");

const LaptopSchema = new Schema({
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  product_name: String,
  description: String,
  cpu_brand: String,
  vga_brand: String,
  size: String,
});

module.exports = Product.discriminator("Laptop", LaptopSchema);
