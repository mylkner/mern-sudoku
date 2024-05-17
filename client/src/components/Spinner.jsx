import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {
    const styles = {
        animation: "spin 1s infinite",
    };

    return <ImSpinner9 style={styles} className="text-2xl text-white" />;
};

export default Spinner;
