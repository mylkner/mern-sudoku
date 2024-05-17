import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../schemas/userSchema.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return next(errorHandler(400, "All fields are required."));

    const doesUserExist = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (doesUserExist && doesUserExist._doc.username === username)
        return next(errorHandler(409, "Username already exists"));

    if (doesUserExist && doesUserExist._doc.email === email)
        return next(errorHandler(409, "Email in use"));

    if (username.length < 4 || username.length > 20)
        return next(
            errorHandler(
                409,
                "Username must be between 4 and 20 characters in length"
            )
        );

    if (/[^0-9A-Za-z]/gi.test(username))
        return next(
            errorHandler(409, "Username may not contain any special characters")
        );

    if (password.length < 4 || password.length > 12)
        return next(
            errorHandler(
                409,
                "Password must be between 4 and 12 characters in length"
            )
        );
};
