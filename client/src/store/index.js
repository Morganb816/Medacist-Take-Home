import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import generalSlice from './general';
import moviesSlice from './movie';
import commentsSlice from './comments';

const store = configureStore({
    reducer: {
        general: generalSlice,
        auth: authSlice,
        movies: moviesSlice,
        comments: commentsSlice,
    }
});

export default store;