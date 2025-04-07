import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

// global variable 
const store = configureStore({
    reducer: {
        auth : authSlice,
         }
});


export default store;