"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialToastState = {
    show: false,
    type: 'success',
    message: 'message',
    timer: 3000
};
export const toastSlice = createSlice({
    name: 'toast-slice',
    initialState: initialToastState,
    reducers: {
        showToast(state, { payload }) {
            state.show = payload.show;
            state.type = payload.type;
            state.message = payload.message;
            state.timer = payload.timer;
        }
    }
});

