import Game from "../schemas/userGameData.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getGameData = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "User authentication failed"));

    try {
        const limit = req.query.limit || 9;
        const startIndex = req.query.startIndex || 0;

        const gameData = await Game.find({ userRef: req.params.id })
            .sort({
                completedAt: -1,
            })
            .limit(limit)
            .skip(startIndex);

        res.status(200).json({ success: true, gameData });
    } catch (error) {
        next(error);
    }
};

export const postGameData = async (req, res, next) => {
    const { timeTaken, difficulty, mistakesMade, gridMatrix, userRef } =
        req.body;

    if (req.user.id !== userRef)
        return next(errorHandler(401, "User authentication failed"));

    try {
        const gameData = await Game.create({
            timeTaken,
            difficulty,
            mistakesMade,
            gridMatrix,
            userRef,
        });
        res.status(201).json({ success: true, gameData });
    } catch (error) {
        next(error);
    }
};

export const getGame = async (req, res, next) => {
    try {
        const gameData = await Game.findById(req.params.id);

        if (req.user.id !== gameData.userRef.toString())
            return next(errorHandler(401, "User authentication failed"));

        res.status(200).json({
            success: true,
            gridMatrix: gameData.gridMatrix,
        });
    } catch (error) {
        next(error);
    }
};
