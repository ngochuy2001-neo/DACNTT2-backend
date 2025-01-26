const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  city: String,
  district: String,
  avenue: String,
  specific_address: String,
  create_at: {
    type: Date,
    default: Date.now,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Address", AddressSchema);
