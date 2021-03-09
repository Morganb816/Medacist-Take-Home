import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import moviesSlice from './movie';
import commentsSlice from './comments';
import generalSlice from './general';

/**
 * @name store
 * @description Global store for our application
 */
const store = configureStore({
    reducer: {
        auth: authSlice,
        movies: moviesSlice,
        comments: commentsSlice,
        general: generalSlice
    }
});

export default store;