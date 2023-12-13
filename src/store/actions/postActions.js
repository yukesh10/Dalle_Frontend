import api from "../../interceptors/interceptor";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk('/post/posts', async() => {
    const response = await api.get("/v1/post");
    const result = response.data;
    return result;
})

export const generateImage = createAsyncThunk('post/generate', async(prompt) => {
    const response = await api.post("/v1/dalle", { prompt });
    const result = response.data;
    return result;
})