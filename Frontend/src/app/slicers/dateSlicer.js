import { createSlice } from "@reduxjs/toolkit";

const dateSlice =createSlice({
    name:'date',
    initialState:{
        loading : true
    },
    reducers:{
        
        setDate(state,{payload}){
            return {
                ...payload,
                loading:false
            }
        }
    }
})

const {actions,reducer}=dateSlice;

export const {setDate}=actions;
export default reducer;