import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../schemas/userSchema.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return next(errorHandler(400, "All fields are required"));

        const doesUserExist = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (doesUserExist && doesUserExist._doc.username === username)
            return next(errorHandler(409, "Username already exists"));

        if (doesUserExist && doesUserExist._doc.email === email)
            return next(errorHandler(409, "Email in use"));

        if (username.length < 4 || username.length > 12)
            return next(
                errorHandler(
                    409,
                    "Username must be between 4 and 12 characters in length"
                )
            );

        if (/[^0-9A-Za-z]/gi.test(username))
            return next(
                errorHandler(
                    409,
                    "Username may not contain any special characters"
                )
            );

        if (password.length < 4 || password.length > 20)
            return next(
                errorHandler(
                    409,
                    "Password must be between 4 and 20 characters in length"
                )
            );

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
        return next(errorHandler(400, "All fields are required"));

    try {
        const validUser = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!validUser) return next(errorHandler(404, "User not found"));

        const isValidPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );

        if (!isValidPassword)
            return next(errorHandler(401, "Invalid password"));

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
