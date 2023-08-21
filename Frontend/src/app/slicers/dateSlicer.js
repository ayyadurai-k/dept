import { createSlice } from "@reduxjs/toolkit";

const dateSlice =createSlice({
    name:'date',
    initialState:{
        
    },
    reducers:{
        setDate(state,{payload}){
            return {
                ...payload
            }
        }
    }
})

const {actions,reducer}=dateSlice;

export const {setDate}=actions;
export default reducer;