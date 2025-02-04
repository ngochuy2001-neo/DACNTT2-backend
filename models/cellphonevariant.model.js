const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellphoneVariantSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Cellphone",
    },
    variant_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
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

module.exports = mongoose.model("CellphoneVariant", CellphoneVariantSchema);
