import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-blue-900 shadow-md">
            <div className="max-w-[85%] flex items-center justify-between mx-auto text-white p-4 text-xl">
                <Link to={"/"}>Play Sudoku</Link>
                <div className="flex gap-2">
                    <Link to={"/:user/history"}>History</Link>
                    <Link to={"/profile"}>Profile</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
