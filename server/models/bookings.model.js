import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now() },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numNights: { type: Number, required: true },
    numGuests: { type: Number, required: true },
    cabinPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      required: true,
    },
    isPaid: { type: Boolean, required: true },
    observations: { type: String, required: true },
    cabinID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cabin",
      required: true,
    },
    guestID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
