import { useState } from "react";
import axios from "axios";
import Container from "../components/signinup/Container";
import Input from "../components/signinup/Input";
import PasswordInput from "../components/signinup/PasswordInput";
import SubmitButton from "../components/signinup/SubmitButton";
import LinkToSignInOrUp from "../components/signinup/LinkToSignInOrUp";

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
            console.log(error.response.data.message);
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <Container onSubmit={onSubmit}>
            <h1 className="text-center text-4xl ">Sign Up</h1>
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
                text={"Username"}
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
            <SubmitButton loading={loading} text={"Sign Up"} error={error} />
            {success && (
                <p className="text-green-600 text-lg font-semibold">
                    User created Successfully!
                </p>
            )}
            <LinkToSignInOrUp text={"Have an account?"} link={"Sign-in"} />
        </Container>
    );
};

export default SignUp;
