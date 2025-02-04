const Product = require("./product.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellphoneSchema = new Schema({
  cpu_brand: String,
  os: String,
  size: String,
});

module.exports = Product.discriminator("Cellphone", CellphoneSchema);
