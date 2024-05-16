import express from "express";
import {
    generateGame,
    validateNumber,
} from "../controllers/sudokuController/sudokuController.js";

const router = express.Router();

router.post("/generate-game", generateGame);
router.post("/validate-number", validateNumber);

export default router;
