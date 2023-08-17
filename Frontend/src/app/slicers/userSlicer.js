import { createSlice } from '@reduxjs/toolkit';

const userSlice =createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user : false
    },
    reducers: {
        userRequest(state){
            return {
                loading: true,
            }
        },
        userSuccess(state, action) {
            return {
                loading: false,
                user: action.payload
            }
        },
        userFail(state, action) {
            return {
                loading: false,
                error : action.payload
            }   
        }
    }
})

const { actions, reducer } = userSlice;

export const { userRequest, userSuccess, userFail } = actions;
export default reducer;