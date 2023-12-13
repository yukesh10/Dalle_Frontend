import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/authActions";
import Cookies from "js-cookie";
import { jwtDecode} from "jwt-decode";

import { USER_DALLE, ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const initialState = {
    user: {},
    isLoading: false,
    token: {},
    error: null,
    message: null,
    isLoggedIn: false
}

const resetState = (state) => {
    state.user = {};
    state.token = {};
    state.isLoggedIn = false;
    state.isLoading = false;
    state.error = null;
    state.message = null;
    return state;
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetLoginState: (state) => {
            state = resetState(state);
        },
        checkLogin: (state) => {
            const userInLocalStorage = localStorage.getItem(USER_DALLE);
            if (userInLocalStorage && JSON.parse(userInLocalStorage)){
                const accessToken = Cookies.get(ACCESS_TOKEN);
                const refreshToken = Cookies.get(REFRESH_TOKEN);
                const decodedAccessToken = jwtDecode(accessToken);
                const decodedRefreshToken = jwtDecode(refreshToken);
                const currentDate = new Date();
                if (decodedAccessToken.exp * 1000 < currentDate.getTime() && decodedRefreshToken.exp * 1000 < currentDate.getTime()) {
                    state = resetState(state);
                } else {
                    state.user = JSON.parse(userInLocalStorage);
                    state.token = {
                        accessToken,
                        refreshToken
                    }
                    state.isLoggedIn = true;
                }
            } else {
                state = initialState;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.success;
            state.isLoggedIn = payload.success;
            if (payload.success){
                state.user = {
                    name: payload.name,
                    email: payload.email,
                    id: payload.id
                };
                state.token = {
                    accessToken: payload.token,
                    refreshToken: payload.refresh
                };
                localStorage.setItem(USER_DALLE, JSON.stringify(state.user));
                Cookies.set(ACCESS_TOKEN, payload.token);
                Cookies.set(REFRESH_TOKEN, payload.refresh);
            }
            state.message = payload.message;
            
        })
        builder.addCase(loginUser.rejected, (state, {error}) => {
            state.isLoading = false;
            state.error = error.message;
        })
    }
})

export const actions = loginSlice.actions;
export default loginSlice;