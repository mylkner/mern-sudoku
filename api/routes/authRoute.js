import express from "express";
import {
    signin,
    signup,
    update,
    signout,
    deleteUser,
    addSecurityQs,
} from "../controllers/authController.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.put("/update/:id", verifyUserToken, update);
router.get("/sign-out/:id", verifyUserToken, signout);
router.delete("/delete/:id", verifyUserToken, deleteUser);
router.post("/add-security-question/:id", verifyUserToken, addSecurityQs);

export default router;
