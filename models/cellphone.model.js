const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellphoneSchema = new Schema(
  {
    brand_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Brand", // Thêm ref để liên kết với bảng Brand
    },
    product_name: {
      type: String,
      required: true,
    },
    description: String,
    cpu_brand: String,
    os: String,
    size: String,
    status: {
      type: String,
      enum: ["available", "out_of_stock", "discontinued"],
      default: "available",
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
    update_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cellphone", CellphoneSchema);
