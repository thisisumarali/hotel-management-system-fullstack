import Settings from "../models/Settings.model.js";

export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();

        res.json({ settings });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const { minBookingLength, maxBookingLength, maxGuestPerBooking } = req.body;

        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({
                minBookingLength,
                maxBookingLength,
                maxGuestPerBooking
            });
        } else {
            settings.minBookingLength = minBookingLength;
            settings.maxBookingLength = maxBookingLength;
            settings.maxGuestPerBooking = maxGuestPerBooking;
            await settings.save();
        }

        res.json({
            msg: "Settings updated",
            settings
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
