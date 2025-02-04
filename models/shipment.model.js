const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  shipment_date: {
    type: Date,
    default: Date.now,
  },
  cost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "returned", "failed"],
    default: "pending",
  },
  tracking_number: {
    type: String,
    unique: true,
    sparse: true,
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

ShipmentSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

ShipmentSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

module.exports = mongoose.model("Shipment", ShipmentSchema);
