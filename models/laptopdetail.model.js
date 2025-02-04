const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopDetailSchema = new Schema({
  variant_id: {
    type: Schema.Types.ObjectId,
    ref: "LaptopVariant",
    required: true,
  },
  variant_field_id: {
    type: Schema.Types.ObjectId,
    ref: "LaptopVariantField",
    required: true,
  },
});

module.exports = mongoose.model("LaptopDetail", LaptopDetailSchema);
