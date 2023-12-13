import api from "../../interceptors/interceptor";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async(formData) => {
        const response = await api.post('/v1/auth/signup', formData);
        const result = response.data;

        return result;
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async(formData) => {
        const response = await api.post('/v1/auth/login', formData);

        const result = response.data;
        return result;
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (userId) => {
        const response = await api.post('/v1/auth/logout', {userId: userId});
        const result = response.data;
        return result;
    }
)