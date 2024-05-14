import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to db");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((err) => console.log(err.message));

const app = express();

app.use(express.json());

app.use("/api/auth/", authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
