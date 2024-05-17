import express from "express";
import { getGameData } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getGameData);

export default router;
