const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  product_name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
