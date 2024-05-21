"use client"

import React from 'react';
import { useDispatch } from "react-redux";
import { authSliceActions } from '@/store/store';
import { getAuth, signOut } from 'firebase/auth';
import withAuth from '../common/guards/authGuard';

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            dispatch(authSliceActions.logout());
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-green-400">
            <h1 className="text-5xl font-bold text-white mb-8">Welcome to Your App</h1>
            <p className="text-xl text-white mb-8 py-2 px-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula justo nec metus sodales, eu feugiat elit semper.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Get Started</button>
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default withAuth(Dashboard);
