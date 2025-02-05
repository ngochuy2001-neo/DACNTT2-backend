const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopVariantFieldSchema = new Schema({
  part_number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mfg_year: {
    type: Number,
    min: 2000, 
    max: new Date().getFullYear(),
  },
  origin: {
    type: String,
    trim: true,
  },
  weight: {
    type: Number,
    min: 0, 
  },
  color: {
    type: String,
    trim: true,
  },
  material: {
    type: String,
    trim: true,
  },
  max_ram_up: {
    type: Number,
    min: 1, 
  },
  max_drive_up: {
    type: Number,
    min: 1, 
  },
  whd_size: {
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    depth: { type: Number, min: 0 },
  },
  cpu: {
    brand: { type: String, trim: true },
    name: { type: String, trim: true },
    model: { type: String, trim: true },
    min_rate: { type: String, trim: true },
  },
  vga: {
    brand: { type: String, trim: true },
    name: { type: String, trim: true },
    model: { type: String, trim: true },
  },
  ram: {
    type: { type: String, trim: true },
    storage: { type: Number, min: 1 },
    slots: { type: Number, min: 1, default: 1 },
  },
  drive: {
    type: { type: String, trim: true },
    model: { type: String, trim: true },
    storage: { type: Number, min: 1 },
    slots: { type: Number, min: 1, default: 1 },
  },
  screen: {
    size: { type: Number, min: 10 }, 
    type: { type: String, trim: true },
    resolution: { type: Number, min: 720 }, 
    refresh_rate: { type: Number, min: 30, max: 240 }, 
    color_rate: { type: String, trim: true },
    ratio: { type: String, trim: true },
  },
  port: {
    wifi: { type: String, trim: true },
    bluetooth: { type: String, trim: true },
    webcam: { type: String, trim: true },
    usb_type1: { type: String, trim: true },
    usb_number1: { type: Number, min: 0, default: 0 },
    usb_type2: { type: String, trim: true },
    usb_number2: { type: Number, min: 0, default: 0 },
    hdmi_type: { type: String, trim: true },
    hdmi_number: { type: Number, min: 0, default: 0 },
    cardreader_number: { type: Number, min: 0, default: 0 },
    jack35mm_number: { type: Number, min: 0, default: 1 }, 
  },
  os: {
    name: { type: String, trim: true },
    version: { type: String, trim: true },
  },
  keyboard: {
    type: { type: String, trim: true },
    led: { type: String, trim: true },
    numbpad: { type: Boolean, default: false }, 
    touchpad: { type: String, trim: true },
  },
  power: {
    capability: { type: Number, min: 10 }, 
    supply: { type: Number, min: 30 }, 
  },
  gears: [{ type: String, trim: true }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

LaptopVariantFieldSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("LaptopVariantField", LaptopVariantFieldSchema);
