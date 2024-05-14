import mongoose from "mongoose";

const userVerificationCode = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: {},
    },
});
