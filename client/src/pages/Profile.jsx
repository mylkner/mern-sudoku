import { useSelector } from "react-redux";
import axios from "axios";
import Input from "../components/signinup/Input";
import PasswordInput from "../components/signinup/PasswordInput";
import SubmitButton from "../components/signinup/SubmitButton";
import UserGameStats from "../components/UserGameStatsDisplay";
import { useState } from "react";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const initialFormData = {
        username: currentUser.username,
        email: currentUser.email,
        password: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            await axios.post("", formData);
            setLoading(false);
            setSuccess(true);
            setError(null);
            setFormData(initialFormData);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-11 min-h-screen my-5 w-full items-center justify-center">
            <h1 className="text-white text-4xl">
                {currentUser.username + "'s Profile"}
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-2 p-3 w-4/5 bg-white rounded-lg mx-auto">
                <form
                    onSubmit={handleOnSubmit}
                    className="md:w-1/2 p-3 flex flex-col gap-5"
                >
                    <Input
                        id="username"
                        text={"Username"}
                        loading={loading}
                        value={formData.username}
                        type={"text"}
                        handleChange={handleChange}
                        error={error}
                        errorType={"User"}
                    />
                    <Input
                        id="email"
                        text={"Email"}
                        loading={loading}
                        value={formData.email}
                        type={"email"}
                        handleChange={handleChange}
                        error={error}
                        errorType={"Email"}
                    />
                    <PasswordInput
                        loading={loading}
                        handleChange={handleChange}
                        password={formData.password}
                        error={error}
                    />
                    <SubmitButton
                        loading={loading}
                        text={"Update"}
                        error={error}
                    />
                    {success && (
                        <p className="text-green-600 text-lg font-semibold">
                            User updated Successfully!
                        </p>
                    )}
                </form>
                <UserGameStats />
            </div>
        </div>
    );
};

export default Profile;
