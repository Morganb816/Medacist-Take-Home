import { createSlice } from '@reduxjs/toolkit';

/**
 * @name 
 * @description Returns wether or not the sidebar is open in state
 * @returns {boolean}
 */
export const sidebarOpen = () => state => state.general.sidebarIsOpen;

/**
 * @name genearalSlice
 * @description Redux slice for managing general applciation state.
 */
const genearalSlice = createSlice({
    name: 'general',
    initialState: {sidebarIsOpen: false},
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarIsOpen = !state.sidebarIsOpen;
        }
    },
});

export const { toggleSidebar } = genearalSlice.actions;
export default genearalSlice.reducer;