import { errorHandler } from "./errorHandler.js";
import User from "../schemas/userSchema.js";

export const validateInputs = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        throw errorHandler(400, "All fields are required");

    const doesUserExist = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (doesUserExist && doesUserExist._doc.username === username)
        throw errorHandler(409, "Username already exists");

    if (doesUserExist && doesUserExist._doc.email === email)
        throw errorHandler(409, "Email in use");

    if (username.length < 4 || username.length > 12)
        throw errorHandler(
            409,
            "Username must be between 4 and 12 characters in length"
        );

    if (/[^0-9A-Za-z]/gi.test(username))
        throw errorHandler(
            409,
            "Username may not contain any special characters"
        );

    if (password.length < 4 || password.length > 20)
        throw errorHandler(
            409,
            "Password must be between 4 and 20 characters in length"
        );
};
