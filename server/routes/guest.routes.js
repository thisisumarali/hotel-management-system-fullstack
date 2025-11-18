import express from "express";
import {
  createGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  deleteGuest
} from "../controllers/guest.controller.js";

const guestRouter = express.Router();

guestRouter.post("/", createGuest);
guestRouter.get("/", getAllGuests);
guestRouter.get("/:id", getGuestById);
guestRouter.put("/:id", updateGuest);
guestRouter.delete("/:id", deleteGuest);

export default guestRouter;
