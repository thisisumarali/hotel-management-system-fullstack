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
        const { minBookingLength, maxBookingLength, maxGuestPerNight } = req.body;

        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({
                minBookingLength,
                maxBookingLength,
                maxGuestPerNight
            });
        } else {
            settings.minBookingLength = minBookingLength;
            settings.maxBookingLength = maxBookingLength;
            settings.maxGuestPerNight = maxGuestPerNight;
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
