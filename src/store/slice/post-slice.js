import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../actions/postActions";

const initialState = {
    isLoading: false,
    posts: [],
    error: null,
    success: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.posts = payload?.data.reverse();
            state.success = payload.data?.success;
        })
        builder.addCase(getAllPosts.rejected, (state, {error}) => {
            state.isLoading = false;
            state.error = error.message;
            state.success = false;
        })
    }
})

export default postSlice;