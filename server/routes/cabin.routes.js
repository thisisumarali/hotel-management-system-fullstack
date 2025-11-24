import express from "express";
import {
    createCabin,
    getAllCabins,
    getCabinById,
    updateCabin,
    deleteCabin
} from "../controllers/cabin.controller.js";

const cabinRouter = express.Router();

cabinRouter.post("/", createCabin);
cabinRouter.get("/", getAllCabins);
cabinRouter.get("/:id", getCabinById);
cabinRouter.put("/:id", updateCabin);
cabinRouter.delete("/:id", deleteCabin);

export default cabinRouter;
