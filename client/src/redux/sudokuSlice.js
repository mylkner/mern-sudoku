import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false,
    time: 0,
    difficulty: "easy",
};

const sudokuSlice = createSlice({
    name: "sudoku",
    initialState,
    reducers: {
        setIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        incrementTime: (state) => {
            state.time += 1;
        },
        setDifficulty: (state, action) => {
            state.difficulty = action.payload;
        },
    },
});

export const { setIsPlaying, incrementTime, setDifficulty } =
    sudokuSlice.actions;

export default sudokuSlice.reducer;
