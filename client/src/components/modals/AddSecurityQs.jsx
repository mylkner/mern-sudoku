import { useState } from "react";
import Container from "./Container.jsx";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const AddSecurityQs = ({ currentUserId, close }) => {
    const [formData, setFormData] = useState({
        securityQs: "childhoodFriend",
        answer: "",
    });
    const [passwordView, setPasswordView] = useState("password");

    const handlePasswordViewChange = () => {
        passwordView === "text"
            ? setPasswordView("password")
            : setPasswordView("text");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container>
            <IoMdCloseCircleOutline
                onClick={close}
                className="ml-auto text-red-600 text-2xl cursor-pointer"
            />
            <article className="text-lg mb-5">
                In case you forget your password, you can add a security
                question. You can then login using this security question and
                update your password from the profile page.
                <br />
                <span className="font-semibold">
                    (Note: Security question cannot be updated after setting
                    it.)
                </span>
            </article>

            <form
                onSubmit={onSubmit}
                className="flex items-left w-full flex-col gap-5"
            >
                <span className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">Question</p>
                    <select
                        value={formData.securityQs}
                        className="p-3 border border-black rounded-lg text-black w-full truncate"
                        onChange={handleChange}
                        id="securityQs"
                    >
                        <option
                            value="childhoodFriend"
                            className="overflow-hidden"
                        >
                            Name of childhood friend?
                        </option>
                        <option value="favBook">Favorite book?</option>
                        <option value="favMovie">Favorite movie?</option>
                        <option value="favFood">Favorite food?</option>
                        <option value="favAct">Favorite actor/actress?</option>
                    </select>
                </span>
                <div className={"flex flex-col gap-1"}>
                    <span className="flex gap-2 items-center">
                        <label
                            htmlFor="answer"
                            className="text-lg font-semibold"
                        >
                            Answer
                        </label>
                        {passwordView === "password" ? (
                            <FaEyeSlash
                                onClick={handlePasswordViewChange}
                                className="text-2xl cursor-pointer"
                            />
                        ) : (
                            <FaEye
                                onClick={handlePasswordViewChange}
                                className="text-2xl cursor-pointer"
                            />
                        )}
                    </span>
                    <input
                        value={formData.answer}
                        id="answer"
                        type={passwordView}
                        onChange={handleChange}
                        placeholder="answer"
                        className="w-full border border-black p-3 rounded-lg"
                    />
                </div>
            </form>
        </Container>
    );
};

export default AddSecurityQs;
