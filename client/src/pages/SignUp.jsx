import { useState } from "react";

const SignUp = () => {
    const [viewPassword, setViewPassword] = useState("password");

    const handlePasswordViewChange = () => {
        viewPassword === "password"
            ? setViewPassword("text")
            : setViewPassword("password");
    };

    return (
        <div className="">
            <h1>Sign Up</h1>

            <form className="flex flex-col gap-2">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" />

                <label htmlFor="password">Password:</label>
                <input type={viewPassword} id="password" />

                <button type="button" onClick={handlePasswordViewChange}>
                    View Password
                </button>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
