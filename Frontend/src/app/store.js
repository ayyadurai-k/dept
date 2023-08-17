import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

import selectReducer from './slicers/selectSlicer';
import errorReducer from './slicers/errorSlicer';
import userReducer from './slicers/userSlicer';
import navReducer from './slicers/navSlicer';
const store = configureStore({
    reducer: {
        select: selectReducer,
        error: errorReducer,
        user: userReducer,
        navbar: navReducer,
    },
    middleware:[thunk]
})

export default store;