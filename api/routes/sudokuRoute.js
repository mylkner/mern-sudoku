import express from "express";
import { generateGame } from "../controllers/sudokuController.js";

const router = express.Router();

router.get("/generate-game", generateGame);

export default router;
