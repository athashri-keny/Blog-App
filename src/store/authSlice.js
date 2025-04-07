import { createSlice } from "@reduxjs/toolkit";

// this is for tracking the user is logged in or not 

// defineing the initial state of the app 
const initialState = {
    status : false,
    userData: null
}


// Payload: Provides the data needed to modify the state.
// createSlice allows you to generate the reducers 

const authSlice = createSlice({
    name: "auth",
    initialState,
     // reducers are the features of the app 
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; // payload helps the reducer to update the current state 
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;