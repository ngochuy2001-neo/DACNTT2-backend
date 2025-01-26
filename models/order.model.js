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
  status: String,
  total_item: Number,
  payment_method_id: {
    type: Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
  total_price: Number,
  create_at: {
    type: Date,
    default: Date.now,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});

module.export = mongoose.model("Order", OrderSchema);
