const Container = ({ onSubmit, children }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen p-5">
            <form
                onSubmit={onSubmit}
                className="w-[80%] bg-white border border-black rounded-lg flex flex-col gap-7 p-4 shadow-2xl"
            >
                {children.slice(0, -1)}
            </form>
            {children.slice(-1)}
        </div>
    );
};

export default Container;
