import { createSlice } from '@reduxjs/toolkit';
import { generateImage } from '../actions/postActions';

const initialState = {
    isLoading: false,
    error: null,
    success: false,
    data: {}
}

const generateImageSlice = createSlice({
    name: 'generateImage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(generateImage.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(generateImage.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.success;
            state.data = payload.data;
        })
        builder.addCase(generateImage.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        })
    }
})

export const actions = generateImageSlice.reducer;
export default generateImageSlice;