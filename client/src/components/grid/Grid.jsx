import { useState } from "react";
import GridCell from "./GridCell";
import GenerateGame from "./GenerateGame";

const Grid = () => {
    const [gridMatrix, setGridMatrix] = useState(
        Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))
    );
    const gridColorsInitial = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => "bg-white")
    );
    const [gridColors, setGridColors] = useState(gridColorsInitial);

    const generateRegionBorder = (row, column) => {
        if (column % 3 === 2 && row % 3 === 2) {
            return "border border-r-slate-700 border-b-slate-700";
        } else if (column % 3 === 2) {
            return "border border-r-slate-700";
        } else if (row % 3 === 2) {
            return "border border-b-slate-700";
        } else {
            return "border";
        }
    };

    const handleOnFocus = (row, column) => {
        setGridColors(gridColorsInitial);
        const gridColorsCopy = [...gridColorsInitial];

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
    };

    const handleValueChange = (e, row, column) => {
        const gridMatrixCopy = [...gridMatrix];
        gridMatrixCopy[row][column] = e.target.value;
        setGridMatrix(gridMatrixCopy);
    };

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
                    onFocus={() => handleOnFocus(row, column)}
                    onChange={(e) => handleValueChange(e, row, column)}
                />
            );
        }

        gridDisplay.push(displayRow);
    }

    return (
        <div className="flex flex-col items-center justify-center max-w-[80%] sm:flex-row mx-auto my-5 gap-3">
            <div className="flex flex-wrap border border-black max-w-[450px] flex-1">
                {gridDisplay}
            </div>
            <div className="flex-1">
                <GenerateGame />
            </div>
        </div>
    );
};

export default Grid;
