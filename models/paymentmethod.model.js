const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema({
  payment_method_name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);
