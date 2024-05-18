import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GameData = ({ gameData }) => {
    const { currentUser } = useSelector((state) => state.user);
    const date = new Date(gameData.completedAt).toUTCString();

    const formatTimeTaken = (time) => {
        const mins =
            time < 600 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
        const seconds = time % 60;
        const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;

        return `${mins} minute(s) and ${secondsFormatted} second(s)`;
    };

    const handleLinkClick = (e, path) => {
        e.preventDefault();
        window.open(path, "_blank", "noopener,noreferrer");
    };

    return (
        <Link
            to={`/${currentUser.username}/history/game/${gameData._id}`}
            onClick={(e) =>
                handleLinkClick(
                    e,
                    `/${currentUser.username}/history/game/${gameData._id}`
                )
            }
            className="flex w-full flex-col p-5 rounded-lg bg-white text-black border border-black gap-3 shadow-lg transition-scale duration-50 hover:scale-[1.01]"
        >
            <p className="text-xl">
                <span className="font-semibold">Completed At:</span> {date}
            </p>
            <p className="text-xl">
                <span className="font-semibold">Difficulty:</span>{" "}
                {gameData.difficulty.slice(0, 1).toUpperCase() +
                    gameData.difficulty.slice(1)}
            </p>
            <p className="text-xl">
                <span className="font-semibold">Mistakes Made:</span>{" "}
                {gameData.mistakesMade}
            </p>
            <p className="text-xl">
                <span className="font-semibold">Time Taken:</span>{" "}
                {formatTimeTaken(gameData.timeTaken)}
            </p>
        </Link>
    );
};
export default GameData;
