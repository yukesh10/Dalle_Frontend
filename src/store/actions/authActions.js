import api from "../../interceptors/interceptor";
import { toast } from "react-toastify";

import { createAsyncThunk } from "@reduxjs/toolkit";

const toastResult = (result, failedMessage) => {
    if (result?.success){
        toast.success(result?.message || "Signup successful");
    } else {
        toast.error(result?.message || failedMessage);
    }
}

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async(formData) => {
        const response = await api.post('/v1/auth/signup', formData);
        const result = response.data;
        toastResult(result, "Signup failed!");
        return result;
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async(formData) => {
        const response = await api.post('/v1/auth/login', formData);
        const result = response.data;
        toastResult(result, "Login failed!");
        return result;
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (userId) => {
        const response = await api.post('/v1/auth/logout', {userId: userId});
        const result = response.data;
        toastResult(result, "Logout failed!");
        return result;
    }
)