import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now() },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  nationalID: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  countryFlag: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);
const Guest = mongoose.model("Guest", guestSchema);
export default Guest
