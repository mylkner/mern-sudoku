import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to db");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((err) => console.log(err.message));
