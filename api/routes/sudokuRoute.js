import express from "express";
import {
    checkIfComplete,
    generateGame,
    resetGame,
    validateNumber,
} from "../controllers/sudokuController/sudokuController.js";

const router = express.Router();

router.post("/generate-game", generateGame);
router.post("/validate-number", validateNumber);
router.get("/reset-game", resetGame);
router.post("/is-game-complete", checkIfComplete);

export default router;
