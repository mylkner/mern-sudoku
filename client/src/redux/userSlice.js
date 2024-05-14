import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInOrUpdateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        deleteOrSignOutUser: (state) => {
            state.currentUser = null;
        },
    },
});

export default userSlice.reducer;
