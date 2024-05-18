import mongoose, { Schema } from "mongoose";

const userGameData = new mongoose.Schema({
    timeTaken: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    mistakesMade: {
        type: Number,
        required: true,
    },
    completedAt: {
        type: Date,
        default: Date.now,
    },
    gridMatrix: {
        type: [[Number]],
        required: true,
    },
    userRef: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

const Game = mongoose.model("Game", userGameData);

export default Game;
