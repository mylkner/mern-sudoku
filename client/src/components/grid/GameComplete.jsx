import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameComplete } from "../../redux/sudokuSlice";

const GameComplete = ({ board, onClick }) => {
    const dispatch = useDispatch();
    const { gameComplete, time, difficulty } = useSelector(
        (state) => state.sudoku
    );

    const mins = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        checkCompletion(board);
        console.log("a");
    }, [board]);

    function checkCompletion(board) {
        console.log("helo");
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (!board[row][col]) return false;
            }
        }
        dispatch(setGameComplete());
    }

    return (
        gameComplete && (
            <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 w-full h-full flex items-center justify-center">
                <div className="bg-white rounded-lg border border-black max-w-[80%] p-5 text-xl">
                    Good job! You have completed this sudoku board.
                    <br />
                    <br />
                    Your time was: {mins + "mins and " + seconds + "seconds"}
                    <br />
                    <br />
                    Your difficulty was:{" "}
                    {difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1)}
                    <br />
                    <br />
                    <button
                        className="w-full bg-blue-500 p-3 text-white font-bold text-xl border border-black rounded-lg"
                        onClick={onClick}
                    >
                        Continue
                    </button>
                </div>
            </div>
        )
    );
};

export default GameComplete;
