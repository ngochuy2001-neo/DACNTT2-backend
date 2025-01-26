const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellphoneSchema = new Schema({
  brand_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  product_name: String,
  description: String,
  cpu_brand: String,
  os: String,
  size: String,
});

module.exports = mongoose.model("Cellphone", CellphoneSchema);
