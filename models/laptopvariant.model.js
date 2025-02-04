const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopVariantSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Laptop",
    required: true,
  },
  variant_name: String,
  price: Number,
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String },
    },
  ],
});

module.exports = mongoose.model("LaptopVariant", LaptopVariantSchema);
