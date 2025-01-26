const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopVariantFieldSchema = new Schema({
  part_number: String,
  mfg_year: Number,
  origin: String,
  weight: Number,
  color: String,
  material: String,
  max_ram_up: Number,
  max_drive_up: Number,
  whd_size: {
    width: Number,
    height: Number,
    depth: Number,
  },
  cpu: {
    brand: String,
    name: String,
    model: String,
    min_rate: String,
  },
  vga: {
    brand: String,
    name: String,
    model: String,
  },
  ram: {
    type: {
      type: String,
    },
    storage: Number,
    slots: Number,
  },
  drive: {
    type: {
      type: String,
    },
    model: String,
    storage: Number,
    slots: Number,
  },
  screen: {
    size: Number,
    type: {
      type: String,
    },
    resolution: Number,
    refresh_rate: Number,
    color_rate: String,
    ratio: String,
  },
  port: {
    wifi: String,
    bluetooth: String,
    webcam: String,
    usb_type1: String,
    usb_number1: Number,
    usb_type2: String,
    usb_number2: Number,
    hdmi_type: String,
    hdmi_number: String,
    cardreader_number: Number,
    jack35mm_number: Number,
  },
  os: {
    name: { type: String },
    version: { type: String },
  },
  keyboard: {
    type: String,
    led: String,
    numbpad: Boolean,
    touchpad: String,
  },
  power: {
    capability: { type: Number },
    supply: { type: Number },
  },
  gears: [{ type: String }],
});
