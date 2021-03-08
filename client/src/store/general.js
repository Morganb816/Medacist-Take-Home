import { createSlice } from '@reduxjs/toolkit';

export const isLoading = () => state => state.general.loading;

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        isLoading: false,
        sideBarOpen: false,
    },
    reducers: {
        setLoading: (state, newLoadingState) => {
            state.isLoading = newLoadingState;
        }
    }
});

export const { setLoading } = generalSlice.actions;
export default generalSlice.reducer;