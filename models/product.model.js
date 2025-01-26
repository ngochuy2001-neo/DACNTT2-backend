const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
