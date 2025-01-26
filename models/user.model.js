const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_name: {
    type: String,
  },
  phone_number: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  is_admin: Boolean,
  create_at: {
    type: Date,
    default: Date.now,
  },
  is_shipper: Boolean,
  update_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
