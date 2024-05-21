"use client"

import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { toastSlice } from "./slices/toastSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { persistStore } from "redux-persist";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/app/firebase-config";
import { getAuth } from "firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

export const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const initialFirebaseState = { auth };
export const firebaseSlice = createSlice({
    name: 'firebase-slice',
    initialState: initialFirebaseState
});

const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["loggedIn", "displayName", "email", "accessToken", "uid"],
};

const store = configureStore({
    reducer: {
        firebaseSlice: firebaseSlice.reducer,
        authSlice: persistReducer(authPersistConfig, authSlice.reducer),
        toastSlice: toastSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
});

export const firebaseSliceActions = firebaseSlice.actions;
export const authSliceActions = authSlice.actions;
export const toastSliceActions = toastSlice.actions;

persistStore(store);

export default store;