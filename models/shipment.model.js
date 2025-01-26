const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  shipment_date: {
    type: Date,
    default: Date.now,
  },
  cost: Number,
  status: String,
});

module.exports = mongoose.model("Shipment", ShipmentSchema);
