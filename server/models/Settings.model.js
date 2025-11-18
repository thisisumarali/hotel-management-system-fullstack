import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now() },
  minBookingLength: { type: Number, required: true },
  maxBookingLength: { type: Number, required: true },
  maxGuestPerNight: { type: Number, required: true },
}, { timestamps: true });

const Settings = mongoose.model("Setting", settingSchema);

export default Settings
