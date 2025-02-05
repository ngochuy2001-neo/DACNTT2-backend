const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellphoneVariantFieldSchema = new Schema(
  {
    mfg_year: { type: Number, required: true },
    origin: { type: String, required: true },
    weight: { type: Number, required: true },
    color: {
      type: String,
      enum: ["Black", "White", "Blue", "Red", "Green", "Yellow"],
      required: true,
    },
    water_resist: {
      type: String,
      enum: ["IP67", "IP68", "None"],
      required: true,
    },
    material: {
      type: String,
      enum: ["Plastic", "Glass", "Metal"],
      required: true,
    },
    ram_storage: { type: Number, required: true },
    mobile_gpu: { type: String, required: true },
    whd_size: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number, required: true },
    },
    mobile_screen: {
      size: { type: Number, required: true },
      type: { type: String, required: true },
      resolution: { type: [Number], required: true },
      refresh_rate: { type: Number, required: true },
      bright_rate: { type: String, required: true },
      touch_type: { type: String, required: true },
      material: { type: String, required: true },
    },
    mobile_cpu: {
      version: { type: String, required: true },
      name: { type: String, required: true },
      processors: { type: Number, required: true },
      max_rate: { type: Number, required: true },
    },
    mobile_connector: {
      wifi: { type: String, required: true },
      bluetooth: { type: String, required: true },
      sim_type: { type: String, required: true },
      sim_number: { type: Number, required: true },
      internet: { type: String, required: true },
      charger_type: { type: String, required: true },
      jack35mm_number: { type: Number, required: true },
      gps: { type: [String], required: true },
    },
    mobile_storage: {
      rom: { type: Number, required: true },
      drive: { type: String, required: true },
      drive_max_storage: { type: Number, required: true },
    },
    mobile_cameras: {
      back_camera: [
        {
          resolution: { type: Number, required: true },
          type: { type: String, required: true },
          video_resolution: { type: Number, required: true },
        },
      ],
      selfie_camera: {
        resolution: { type: Number, required: true },
        type: { type: String, required: true },
        video_resolution: { type: Number, required: true },
      },
    },
    mobile_power: {
      type: { type: String, required: true },
      capability: { type: Number, required: true },
      charger: { type: String, required: true },
    },
    mobile_gears: { type: [String], required: true },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model(
  "CellphoneVariantField",
  CellphoneVariantFieldSchema
);
