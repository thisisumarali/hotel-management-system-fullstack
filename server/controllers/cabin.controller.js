import Cabin from "../models/cabins.model.js";

export const createCabin = async (req, res) => {
    try {
        const { name, maxCapacity, reqularPrice, discount, description, images } =
            req.body;

        const cabin = await Cabin.create({
            name,
            maxCapacity,
            reqularPrice,
            discount,
            description,
            images
        });

        res.status(201).json({
            msg: "Cabin created",
            cabin
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get all cabins
export const getAllCabins = async (req, res) => {
    try {
        const cabins = await Cabin.find().sort({ createdAt: -1 });

        res.json({ cabins });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get cabin by ID
export const getCabinById = async (req, res) => {
    try {
        const cabin = await Cabin.findById(req.params.id);

        if (!cabin) return res.status(404).json({ msg: "Cabin not found" });

        res.json({ cabin });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Update cabin
export const updateCabin = async (req, res) => {
    try {
        const updatedCabin = await Cabin.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedCabin)
            return res.status(404).json({ msg: "Cabin not found" });

        res.json({
            msg: "Cabin updated",
            cabin: updatedCabin
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete cabin
export const deleteCabin = async (req, res) => {
    try {
        const deleted = await Cabin.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ msg: "Cabin not found" });

        res.json({ msg: "Cabin deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
