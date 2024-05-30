import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { validateInputs } from "../utils/validateInputs.js";
import User from "../schemas/userSchema.js";
import Game from "../schemas/userGameData.js";
import config from "../config.json" assert { type: "json" };

export const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            throw errorHandler(400, "All fields are required");

        const doesUserExist = await User.findOne({ username });

        await validateInputs(req, res, doesUserExist);

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        const { password: pass, ...rest } = newUser._doc;

        res.status(201).json({
            success: true,
            user: rest,
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            throw errorHandler(400, "All fields are required");

        const validUser = await User.findOne({ username });

        if (!validUser) throw errorHandler(404, "User not found");

        const isValidPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );

        if (!isValidPassword) throw errorHandler(401, "Invalid password");

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie("accessToken", token, config[process.env.NODE_ENV].cookie)
            .status(200)
            .json({
                success: true,
                user: rest,
            });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id)
            throw errorHandler(401, "User authentication failed");

        const { username, password } = req.body;

        const doesUserExist = await User.findOne({
            username,
            _id: { $ne: req.params.id },
        });

        await validateInputs(req, res, doesUserExist);

        const updateFields = {
            username,
        };

        if (password) {
            updateFields.password = bcryptjs.hashSync(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: updateFields,
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) throw errorHandler(404, "User not found");

        const { password: pass, ...rest } = updatedUser._doc;

        res.status(200).json({ success: true, user: rest });
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        if (req.params.id !== req.user.id)
            throw errorHandler(401, "User authentication failed");

        res.clearCookie("accessToken", config[process.env.NODE_ENV].cookie);
        res.status(200).json({
            success: true,
            message: "User has been logged out",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id)
            throw errorHandler(401, "User authentication failed");

        const toDelete = await User.findByIdAndDelete(req.params.id);

        if (!toDelete) throw errorHandler(404, "User not found");

        await Game.deleteMany({ userRef: req.params.id });

        res.clearCookie("accessToken", config[process.env.NODE_ENV].cookie);
        res.status(200).json({
            success: true,
            message: "User has been deleted",
        });
    } catch (error) {
        next(error);
    }
};
