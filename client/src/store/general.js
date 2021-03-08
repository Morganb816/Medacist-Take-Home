import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        isLoading: false,
    },
    reducers: {
        isLoading: (state, newLoadingState) => {
            state.isLoading = newLoadingState;
        }
    }
});

export const { isLoading } = generalSlice.actions;
export default generalSlice.reducer;