const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopVariantSchema = new Schema({
  variant_id: {
    type: String,
    unique: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Laptop",
    required: true,
  },
  variant_name: String,
  price: Number,
});

module.exports = mongoose.model("LaptopVariant", LaptopVariantSchema);
