"use client"

import { toastSliceActions } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const Toast = () => {
    const dispatch = useDispatch();

    const show = useSelector(state => state.toastSlice.show);
    const type = useSelector(state => state.toastSlice.type);
    const message = useSelector(state => state.toastSlice.message);
    const timer = useSelector(state => state.toastSlice.timer);

    useEffect(() => {
        setTimeout(() => {
            dispatch(toastSliceActions.showToast({
                show: false,
                type: '',
                message: "",
                timer: 0
            }));
        }, timer);
    }, [show])

    let bgColor = '';
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            break;
        default:
            bgColor = 'bg-gray-500';
    }

    return (
        <>
            {
                show && <div className={`fixed top-5 right-5 p-4 rounded-lg ${bgColor} text-white`}>
                    {message}
                </div>
            }
        </>
    );
};

export default Toast;