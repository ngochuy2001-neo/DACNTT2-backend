const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema({
  payment_method_name: String,
});

module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);
