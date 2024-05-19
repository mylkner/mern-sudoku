import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { validateInputs } from "../utils/validateInputs.js";
import User from "../schemas/userSchema.js";
import Game from "../schemas/userGameData.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            throw errorHandler(400, "All fields are required");

        const doesUserExist = await User.findOne({
            $or: [{ username }, { email }],
        });

        await validateInputs(req, res, doesUserExist);

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await User.create({
            username,
            email,
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
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password)
        throw errorHandler(400, "All fields are required");

    try {
        const validUser = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!validUser) throw errorHandler(404, "User not found");

        const isValidPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );

        if (!isValidPassword) throw errorHandler(401, "Invalid password");

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
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

        const { username, email, password } = req.body;

        const doesUserExist = await User.findOne({
            $or: [{ username }, { email }],
            _id: { $ne: req.params.id },
        });

        await validateInputs(req, res, doesUserExist);

        const updateFields = {
            username,
            email,
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

        res.clearCookie("accessToken");
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

        res.clearCookie("accessToken");
        res.status(200).json({
            success: true,
            message: "User has been deleted",
        });
    } catch (error) {
        next(error);
    }
};
