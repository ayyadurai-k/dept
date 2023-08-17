import { createSlice } from '@reduxjs/toolkit'

const selectSlice = createSlice({
    name: 'select',
    initialState: {
        value: {
            select : 1
        }
    },
    reducers: {
        setSelect: (state, action) => {
            state.value = action.payload;
        }
    }
})


export default selectSlice.reducer;
export const { setSelect } = selectSlice.actions;