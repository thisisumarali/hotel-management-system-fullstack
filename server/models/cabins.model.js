import mongoose from "mongoose";

const cabinSchema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now() },
    name: {
        type: String,
        required: true,
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    reqularPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    discount: {
        type: Number,
        required: true,
    },
    description: { type: String, },
    images: {
        type: [String],
        default: [],
    },

},
    { timestamps: true }
);
const Cabins = mongoose.model("Cabin", cabinSchema);
export default Cabins
