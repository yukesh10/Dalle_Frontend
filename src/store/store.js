import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slice/login-slice';
import signupSlice from './slice/signup-slice';
import logoutSlice from './slice/logout-slice';
import postSlice from './slice/post-slice';
import generateImageSlice from './slice/generate-image-slice';

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        signup: signupSlice.reducer,
        logout: logoutSlice.reducer,
        post: postSlice.reducer,
        generateImage: generateImageSlice.reducer
    }
})

export default store;