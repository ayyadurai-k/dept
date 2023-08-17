import { createSlice } from "@reduxjs/toolkit";

const navSlice =createSlice({
    name: 'navbar',
    initialState: {
        select : 1
    },
    reducers: {
        changeSelect(state, action) {
            return {
                select : action.payload
            }
        }
    }
})

const { actions, reducer } = navSlice;

export default reducer;
export const { changeSelect } = actions;