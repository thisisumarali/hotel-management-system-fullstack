import Guest from "../models/guest.model.js";

export const createGuest = async (req, res) => {
  try {
    const { fullName, email, nationalID, nationality, countryFlag } = req.body;

    const guest = await Guest.create({
      fullName,
      email,
      nationalID,
      nationality,
      countryFlag,
    });

    res.status(201).json({
      msg: "Guest created",
      guest,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all guests
export const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });

    res.json({ guests });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) return res.status(404).json({ msg: "Guest not found" });

    res.json({ guest });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateGuest = async (req, res) => {
  try {
    const updated = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ msg: "Guest not found" });

    res.json({
      msg: "Guest updated",
      guest: updated,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteGuest = async (req, res) => {
  try {
    const deleted = await Guest.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ msg: "Guest not found" });

    res.json({ msg: "Guest deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
