const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellphoneVariantSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  variant_name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("CellphoneVariant", CellphoneVariantSchema);
