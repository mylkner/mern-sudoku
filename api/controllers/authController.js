import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import { validateInputs } from "../utils/validateInputs.js";
import User from "../schemas/userSchema.js";

export const signup = async (req, res, next) => {
    try {
        await validateInputs(req, res, next);

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

export const update = async (req, res, next) => {};
