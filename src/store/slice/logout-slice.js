import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../actions/authActions";
import { USER_DALLE, ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

import Cookies from "js-cookie";

const initialState = {
    isLoading: false,
    error: null,
    message: null,
    success: false
}

const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.success = payload.success;
            state.message = payload.message;

            localStorage.removeItem(USER_DALLE);
            Cookies.remove(ACCESS_TOKEN);
            Cookies.remove(REFRESH_TOKEN);
        })
        builder.addCase(logoutUser.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        })
    }
})

export default logoutSlice;