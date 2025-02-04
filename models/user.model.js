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
  },
  password: String,
  is_admin: {
    type: Boolean,
    default: false,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  is_shipper: {
    type: Boolean,
    default: false,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.update_at = Date.now();
  }
  next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
  this.set({ update_at: Date.now() });
  next();
});

module.exports = mongoose.model("User", UserSchema);
