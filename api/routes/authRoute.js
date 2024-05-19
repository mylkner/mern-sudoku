import express from "express";
import { signin, signup, update } from "../controllers/authController.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.put("/update", verifyUserToken, update);

export default router;
