import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/:id", getBookingById);
bookingRouter.put("/:id", updateBooking);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
