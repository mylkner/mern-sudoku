import Spinner from "./Spinner";

const Modal = ({ yes, no, disabled }) => {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60 w-full flex items-center justify-center min-h-screen z-50">
            <div className="flex items-center max-w-[60%] bg-white border border-black rounded-lg p-5 gap-3 flex-col shadow-md mx-auto">
                <p className="text-xl mb-5">
                    Are you sure you want to delete your account?
                </p>
                <div className="flex items-center justify-between w-full">
                    <button
                        disabled={disabled}
                        onClick={yes}
                        className="bg-green-600 text-xl flex items-center justify-center text-white p-3 w-[45%] border border-black rounded-lg"
                    >
                        {disabled ? <Spinner size="text-2xl" /> : "Yes"}
                    </button>
                    <button
                        disabled={disabled}
                        onClick={no}
                        className="bg-red-600 text-xl text-white p-3 w-[45%] border border-black rounded-lg"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Modal;
