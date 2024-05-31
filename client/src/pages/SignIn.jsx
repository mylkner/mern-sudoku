import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../utils/axiosInstance";
import { signInOrUpdateUserSuccess } from "../redux/userSlice";
import Container from "../components/signinup/Container";
import Input from "../components/signinup/Input";
import PasswordInput from "../components/signinup/PasswordInput";
import SubmitButton from "../components/signinup/SubmitButton";
import LinkToSignInOrUp from "../components/signinup/LinkToSignInOrUp";
import SignInSecurityQs from "../components/modals/SignInSecurityQs.jsx";

const SignIn = () => {
    const initialFormData = {
        username: "",
        password: "",
    };
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [willSignInWithSecurityQs, setWillSignInWithSecurityQs] =
        useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post("/api/auth/sign-in", formData, {
                withCredentials: true,
            });
            setLoading(false);
            setError(null);
            setFormData(initialFormData);
            dispatch(signInOrUpdateUserSuccess(data.user));
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <>
            <Container onSubmit={onSubmit}>
                <h1 className="text-center text-4xl ">Sign In</h1>
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
                <PasswordInput
                    loading={loading}
                    handleChange={handleChange}
                    password={formData.password}
                    error={error}
                />
                <button
                    disabled={loading}
                    type="button"
                    className="text-red-600 hover:underline mr-auto w-fit"
                    onClick={() => setWillSignInWithSecurityQs(true)}
                >
                    Forgot password?
                </button>
                <SubmitButton
                    loading={loading}
                    text={"Sign In"}
                    error={error}
                />
                <LinkToSignInOrUp
                    text={"Don't have an account?"}
                    link={"Sign-up"}
                />
            </Container>
            {willSignInWithSecurityQs && (
                <SignInSecurityQs
                    close={() => setWillSignInWithSecurityQs(false)}
                />
            )}
        </>
    );
};

export default SignIn;
