const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  total_item: {
    type: Number,
    required: true,
  },
  payment_method_id: {
    type: Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
  total_price: {
    type: Number,
    required: true,
  },
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

OrderSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

OrderSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
