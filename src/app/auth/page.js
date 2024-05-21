"use client"

import React, { useState, useEffect } from 'react';

import Login from './login/page';
import Register from './register/page';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';


function Auth() {
    const { push } = useRouter();
    const [activeTab, setActiveTab] = useState('login');
    const isLoginTab = activeTab === 'login';

    const accessToken = useSelector(state => state.authSlice.accessToken);
    
    useEffect(() => {
        if (accessToken) {
            push('/dashboard');
        }
    }, [])
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="flex mb-6">
                <button
                    className={`w-1/2 ${isLoginTab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} font-bold py-2 px-4 rounded-tl-md focus:outline-none`}
                    onClick={() => handleTabClick('login')}
                >
                    Login
                </button>
                <button
                    className={`w-1/2 ${isLoginTab ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'} font-bold py-2 px-4 rounded-tr-md focus:outline-none`}
                    onClick={() => handleTabClick('register')}
                >
                    Register
                </button>
            </div>
            {isLoginTab ? <Login /> : <Register handleTabClick={handleTabClick} />}
        </>
    );
}

export default Auth;