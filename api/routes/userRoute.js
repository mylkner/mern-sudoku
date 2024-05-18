import express from "express";
import {
    getGameData,
    postGameData,
    getGame,
} from "../controllers/userController.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/:id", verifyUserToken, getGameData);
router.post("/game-data", verifyUserToken, postGameData);
router.get("/game/:id", verifyUserToken, getGame);

export default router;
