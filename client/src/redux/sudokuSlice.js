import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false,
    isPaused: false,
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
        setIsPaused: (state) => {
            if (state.isPlaying) {
                state.isPaused = !state.isPaused;
            }
        },
        reset: (state) => {
            state.isPlaying = false;
            state.isPaused = false;
            state.time = 0;
        },
    },
});

export const {
    setIsPlaying,
    incrementTime,
    setDifficulty,
    setIsPaused,
    reset,
} = sudokuSlice.actions;

export default sudokuSlice.reducer;
