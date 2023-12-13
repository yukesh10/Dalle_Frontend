import { createSlice } from "@reduxjs/toolkit";
import { signupUser } from "../actions/authActions";

const initialState = {
    isLoading: false,
    error: null,
    message: null,
    success: false
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(signupUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.success;
            state.message = payload.message;
        })
        builder.addCase(signupUser.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        })
    }
})

export default signupSlice;