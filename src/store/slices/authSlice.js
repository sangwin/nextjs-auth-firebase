"use client"

import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

const initialState = {
    loggedIn: false,
    auth: null,
    emailVerified: false,
    uid: '',
    accessToken: '',
    displayName: '',
    email: ''
};
export const authSlice = createSlice({
    name: 'auth-slice',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.loggedIn = true;
            localStorage.setItem('accessToken', action.payload.accessToken);
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.emailVerified = action.payload.emailVerified;
            state.uid = action.payload.uid;
        },
        setToken(state, action) {
            state.accessToken = action.payload
        },
        logout(state, action) {
            state.loggedIn = false;
            localStorage.removeItem('accessToken');
            state.displayName = '';
            state.email = '';
            state.accessToken = '';
            state.emailVerified = '';
            state.uid = '';
        },
        setAuth(state, action) {
            console.log("🚀 ~ setAuth ~ action:", action)
            state.auth = action.payload;
        }
    }
});
