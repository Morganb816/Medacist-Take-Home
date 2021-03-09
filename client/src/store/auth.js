import { createSlice } from '@reduxjs/toolkit';

/**
 * @name isAuthorized
 * @description Selector for checking if the user is authorized
 * @returns {boolean}
 */
export const isAuthorized = () => state => !!state.auth.user;

/**
 * @name authSlice
 * @description Redux slice for managing auth state
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload;
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;