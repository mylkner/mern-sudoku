import Game from "../schemas/userGameData.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getUserData = (req, res, next) => {};

export const getGameHistory = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "User authentication failed"));

    try {
        const limit = req.query.limit || 9;
        const startIndex = req.query.startIndex || 0;
        const { from, to, difficulties, mistakesMade, timeTaken, sort, order } =
            req.body;
        const query = {
            userRef: req.params.id,
        };

        if (from && to) {
            query["completedAt"] = { $gte: from, $lte: to };
        } else if (from) {
            query["completedAt"] = { $gte: from };
        } else if (to) {
            query["completedAt"] = { $lte: to };
        }

        if (difficulties && difficulties.length > 0) {
            const d = difficulties.map((d) => d.toLowerCase());
            query["difficulty"] = { $in: d };
        }

        if (mistakesMade && mistakesMade.length > 0) {
            query["mistakesMade"] = { $in: mistakesMade };
        }

        if (timeTaken) {
            query["timeTaken"] = { $lte: timeTaken };
        }

        const gameData = await Game.find(query)
            .sort({
                [sort]: order,
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
