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
<<<<<<< HEAD
                maxGuestPerBooking,

            })
            res.json({
                msg: "Settings created",
                settings
=======
                maxGuestPerBooking
>>>>>>> 58da312912dea4c7fb95cad96575cbe40c554e2c
            });
        } else {
            settings.minBookingLength = minBookingLength;
            settings.maxBookingLength = maxBookingLength;
            settings.maxGuestPerBooking = maxGuestPerBooking;
            await settings.save();
            res.json({
                msg: "Settings updated",
                settings
            });
        }

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
