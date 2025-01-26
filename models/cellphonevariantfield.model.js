const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellphoneVariantFieldSchema = new Schema({
  mfg_year: { type: Number },
  origin: { type: Number },
  weight: { type: Number },
  color: { type: String },
  water_resist: { type: String },
  material: { type: String },
  ram_storage: { type: Number },
  mobile_gpu: { type: String },
  whd_size: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  mobile_screen: {
    size: { type: Number },
    type: { type: String },
    resolution: [Number],
    refresh_rate: { type: Number },
    bright_rate: { type: String },
    touch_type: { type: String },
    material: { type: String },
  },
  mobile_cpu: {
    version: { type: String },
    name: { type: String },
    processors: { type: Number },
    max_rate: { type: Number },
  },
  mobile_connector: {
    wifi: { type: String },
    bluetooth: { type: String },
    sim_type: { type: String },
    sim_number: { type: Number },
    internet: { type: String },
    charger_type: { type: String },
    jack35mm_number: { type: Number },
    gps: [String],
  },
  mobile_storage: {
    rom: { type: Number },
    drive: { type: String },
    drive_max_storage: { type: Number },
  },
  mobile_cameras: {
    back_camera: [
      {
        resolution: { type: Number },
        type: { type: String },
        video_resolution: { type: Number },
      },
    ],
    selfie_camera: {
      resolution: { type: Number },
      type: { type: String },
      video_resolution: { type: Number },
    },
  },
  mobile_power: {
    type: { type: String },
    capability: { type: Number },
    chaeger: { type: String },
  },
  mobile_gears: [String],
});

module.export = mongoose.model(
  "CellphoneVariantField",
  CellphoneVariantFieldSchema
);
