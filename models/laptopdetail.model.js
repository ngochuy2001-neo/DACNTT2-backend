const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopDetailSchema = new Schema({
  variant_id: {
    type: Schema.Types.ObjectId,
    ref: "LaptopVariant",
  },
  variant_field_id: {
    type: Schema.Types.ObjectId,
    ref: "LaptopVariantField",
  },
});

module.exports = mongoose.model("LaptopDetail", LaptopDetailSchema);
