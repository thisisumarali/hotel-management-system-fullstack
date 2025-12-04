import Booking from "../models/bookings.model.js";

export const createBooking = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice,
      totalPrice,
      status,
      isPaid,
      observations,
      cabinID,
      guestID,
    } = req.body;

    const booking = await Booking.create({
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice,
      totalPrice,
      status,
      isPaid,
      observations,
      cabinID,
      guestID,
    });

    res.status(201).json({
      msg: "Booking created",
      booking,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("cabinID", "name")
      .populate("guestID", "fullName email");

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("cabinID")
      .populate("guestID");

    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ msg: "Booking not found" });

    res.json({
      msg: "Booking updated",
      booking: updated,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ msg: "Booking not found" });

    res.json({ msg: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
