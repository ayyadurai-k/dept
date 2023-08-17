import { createSlice } from "@reduxjs/toolkit";


const errorSlice = createSlice({
    name: 'error',
    initialState: {
        value: {
            
        }
    },
    reducers: {
        setError: (state, action) => {
            state.value = action.payload;
        }
    }
})
export default errorSlice.reducer;
export const { setError } = errorSlice.actions;