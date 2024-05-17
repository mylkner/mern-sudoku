import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Spinner from "../components/Spinner";

const SignUp = () => {
    const initialFormData = {
        username: "",
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [passwordView, setPasswordView] = useState("password");

    const classNames = {
        inputContainer: "flex flex-col gap-1",
        label: "text-lg font-semibold",
        input: "w-full border border-black p-3 rounded-lg",
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            await axios.post("/api/auth/sign-up", formData);
            setLoading(false);
            setSuccess(true);
            setError(null);
            setFormData(initialFormData);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handlePasswordViewChange = () => {
        passwordView === "text"
            ? setPasswordView("password")
            : setPasswordView("text");
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen p-5">
            <form
                onSubmit={onSubmit}
                className="w-[80%] bg-white border border-black rounded-lg flex flex-col gap-7 p-4 shadow-2xl"
            >
                <h1 className="text-center text-4xl ">Sign Up</h1>
                <div className={classNames.inputContainer}>
                    <label htmlFor="username" className={classNames.label}>
                        Username
                    </label>
                    <input
                        disabled={loading}
                        id="username"
                        value={formData.username}
                        type="text"
                        onChange={handleChange}
                        placeholder="username"
                        className={classNames.input}
                    />
                    {error && error.includes("Username") && (
                        <p className="text-red-500">{error}</p>
                    )}
                </div>
                <div className={classNames.inputContainer}>
                    <label htmlFor="email" className={classNames.label}>
                        Email
                    </label>
                    <input
                        disabled={loading}
                        value={formData.email}
                        id="email"
                        type="email"
                        onChange={handleChange}
                        placeholder="email"
                        className={classNames.input}
                    />
                    {error && error.includes("Email") && (
                        <p className="text-red-500">{error}</p>
                    )}
                </div>
                <div className={classNames.inputContainer}>
                    <span className="flex gap-2 items-center">
                        <label htmlFor="password" className={classNames.label}>
                            Password
                        </label>
                        {passwordView === "password" ? (
                            <FaEyeSlash
                                onClick={handlePasswordViewChange}
                                className="text-2xl"
                            />
                        ) : (
                            <FaEye
                                onClick={handlePasswordViewChange}
                                className="text-2xl"
                            />
                        )}
                    </span>
                    <input
                        disabled={loading}
                        value={formData.password}
                        id="password"
                        type={passwordView}
                        onChange={handleChange}
                        placeholder="password"
                        className={classNames.input}
                    />
                    {error && error.includes("Password") && (
                        <p className="text-red-500">{error}</p>
                    )}
                </div>
                {error && error.includes("fields") && (
                    <p className="text-red-500">{error}</p>
                )}
                <button
                    disabled={loading}
                    className="disabled:opacity-60 flex justify-center items-center w-full rounded-lg bg-blue-500 border border-black text-white text-2xl p-3 mt-3"
                >
                    {loading ? <Spinner /> : "Sign Up"}
                </button>
                {success && (
                    <p className="text-green-600 text-lg font-semibold">
                        User created Successfully!
                    </p>
                )}
            </form>
            <p className="text-white text-lg">
                Have an account?{" "}
                <Link to="/sign-in" className="hover:underline text-green-300">
                    Sign-in
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
