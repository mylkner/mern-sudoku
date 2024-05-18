import Game from "../schemas/userGameData.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getGameData = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "User authentication failed"));

    try {
        const gameData = await Game.find({ userRef: req.params.id });
        res.status(200).json({ success: true, gameData });
    } catch (error) {
        next(error);
    }
};

export const postGameData = async (req, res, next) => {
    const { timeTaken, difficulty, mistakesMade, userRef } = req.body;

    if (req.user.id !== userRef)
        return next(errorHandler(401, "User authentication failed"));

    try {
        const gameData = await Game.create({
            timeTaken,
            difficulty,
            mistakesMade,
            userRef,
        });
        res.status(201).json({ success: true, gameData });
    } catch (error) {
        next(error);
    }
};
