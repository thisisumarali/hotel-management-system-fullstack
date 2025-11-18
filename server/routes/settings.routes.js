import express from "express";
import {
    getSettings,
    updateSettings
} from "../controllers/settings.controller.js";

const settingsRouter = express.Router();

settingsRouter.get("/", getSettings);
settingsRouter.put("/", updateSettings);

export default settingsRouter;
