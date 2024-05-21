"use client"

import { authSliceActions } from "./../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function IndexComponent({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authSliceActions.setToken(localStorage.getItem('accessToken')));
    }, [])

    return (
        <>{children}</>
    );
}
