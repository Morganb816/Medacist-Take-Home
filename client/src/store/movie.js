import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SWAPI from '../api/SWAPI';

export const movieSelector = movieId => state => state.movies.find(movie => movie.title === movieId);
export const moviesSelector = () => state => state.movies;

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    () => SWAPI.getFilms()
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchMovies.fulfilled]: (state, action) => {
            if (action.payload) {
                state = action.payload;
            }
            return state;
        }
    }
});

export default moviesSlice.reducer;