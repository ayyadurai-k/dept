import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

import selectReducer from './slicers/selectSlicer';
import errorReducer from './slicers/errorSlicer';
import userReducer from './slicers/userSlicer';
import navReducer from './slicers/navSlicer';
import dateReducer from './slicers/dateSlicer';
 
const store = configureStore({
    reducer: {
        select: selectReducer,
        error: errorReducer,
        user: userReducer,
        navbar: navReducer,
        date:dateReducer
    },
    middleware:[thunk]
})

export default store;