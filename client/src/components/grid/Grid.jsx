import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import GridCell from "./GridCell";
import Timer from "./Timer";
import Difficulty from "./Difficulty";
import Buttons from "./Buttons";
import PauseScreen from "./PauseScreen";
import { reset, setIsPaused, setIsPlaying } from "../../redux/sudokuSlice";

const Grid = () => {
    const dispatch = useDispatch();
    const { difficulty, isPaused } = useSelector((state) => state.sudoku);

    const [gridMatrix, setGridMatrix] = useState(
        Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""))
    );
    const gridColorsInitial = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => "bg-white")
    );
    const [gridColors, setGridColors] = useState(gridColorsInitial);

    async function generateGame() {
        setGridColors(gridColorsInitial);
        try {
            const { data } = await axios.post("/api/sudoku/generate-game", {
                difficulty,
            });
            setGridMatrix(data.partialBoard);
            dispatch(setIsPlaying());
        } catch (error) {
            console.log(error.message);
        }
    }

    async function resetGame() {
        try {
            const { data } = await axios.get("/api/sudoku/reset-game");
            setGridMatrix(data.board);
            setGridColors(gridColorsInitial);
            dispatch(reset());
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleOnCellClick(row, column) {
        setGridColors(gridColorsInitial);
        const gridColorsCopy = gridColorsInitial.map((arr) => arr.slice(0));

        for (let i = 0; i < 9; i++) {
            const regionRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const regionCol = 3 * Math.floor(column / 3) + (i % 3);
            gridColorsCopy[regionRow][regionCol] = "bg-blue-200";
        }

        for (let i = 0; i < 9; i++) {
            gridColorsCopy[row][i] = "bg-blue-400";
            gridColorsCopy[i][column] = "bg-blue-400";
        }

        gridColorsCopy[row][column] = "bg-blue-700";

        setGridColors(gridColorsCopy);
    }

    async function isInputValid(value, row, column) {
        try {
            const { data } = await axios.post("/api/sudoku/validate-number", {
                value,
                row,
                column,
            });
            return data.success;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleValueChange(e, row, column) {
        const inputValue = Number(e.target.value);
        const isValid = await isInputValid(inputValue, row, column);

        if (!isValid) {
            const gridColorsCopy = gridColors.map((arr) => arr.slice(0));
            gridColorsCopy[row][column] = "bg-red-700";
            setGridColors(gridColorsCopy);
            return;
        }

        const gridMatrixCopy = gridMatrix.map((arr) => arr.slice(0));
        const gridColorsCopy = gridColors.map((arr) => arr.slice(0));
        gridMatrixCopy[row][column] = inputValue;
        gridColorsCopy[row][column] = "bg-green-700";
        setGridMatrix(gridMatrixCopy);
        setGridColors(gridColorsCopy);
    }

    function generateRegionBorder(row, column) {
        if (column % 3 === 2 && row % 3 === 2) {
            return "border-r-slate-700 border-b-slate-700";
        } else if (column % 3 === 2) {
            return "border-r-slate-700";
        } else if (row % 3 === 2) {
            return "border-b-slate-700";
        }
    }

    const gridDisplay = [];

    for (let row = 0; row < 9; row++) {
        const displayRow = [];

        for (let column = 0; column < 9; column++) {
            displayRow.push(
                <GridCell
                    key={column}
                    value={gridMatrix[row][column]}
                    bg={gridColors[row][column]}
                    border={generateRegionBorder(row, column)}
                    onClick={() => handleOnCellClick(row, column)}
                    onChange={(e) => handleValueChange(e, row, column)}
                    disabled={gridMatrix[row][column]}
                />
            );
        }

        gridDisplay.push(displayRow);
    }

    return (
        <div className="flex flex-col justify-center max-w-[80%] sm:flex-row mx-auto my-5 gap-3">
            <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xl text-white">
                    <p>
                        {difficulty.slice(0, 1).toUpperCase() +
                            difficulty.slice(1)}{" "}
                        Mode
                    </p>
                    <Timer />
                </div>
                <div className="flex flex-wrap border border-black max-w-[450px] relative">
                    {gridDisplay}
                    {isPaused && (
                        <PauseScreen onClick={() => dispatch(setIsPaused())} />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Difficulty />
                <Buttons generateGame={generateGame} resetGame={resetGame} />
            </div>
        </div>
    );
};

export default Grid;
