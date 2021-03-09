import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SWAPI from '../api/SWAPI';

/**
 * @name movieSelector
 * @description Selects a movie from state with a provided id.
 * @param {string} movieId Episode Id of the movie to select.
 * @returns {object} The found movie
 */
export const movieSelector = movieId => state => state.movies.find(movie => movie.title === movieId);
/**
 * @name moviesSelector
 * @description Selects all movies in store.
 * @returns {object[]} Array of movies
 */
export const moviesSelector = () => state => state.movies;

/**
 * @name fetchMovies
 * @description Thunk for fetching all movies from SWAPI.
 * @returns {void}
 */
export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    () => SWAPI.getFilms()
);

/**
 * @name moviesSlice
 * @description Redux slice for managing movie state
 */
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