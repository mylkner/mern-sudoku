import express from "express";
import { getGameData, postGameData } from "../controllers/userController.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/:id", verifyUserToken, getGameData);
router.post("/game-data", verifyUserToken, postGameData);

export default router;
