"use client"

import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";


function ForgotPassword() {
    const auth = getAuth();
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const done = await sendPasswordResetEmail(auth, email);
            if (done) {
                alert('Email Send Success');
            }
        } catch (error) {
            console.error(error.message);
            alert('Email Send Error : ' + error.message);
        }
    };

    return (
        <div id="forgotPasswordForm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Forgot Password</h2>
            <form onSubmit={handlePasswordReset}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                </div>
                <Link href="/auth" className="text-blue-500 hover:underline py-2 px-4 ">
                    Back to Login
                </Link>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white  float-right font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send </button>

            </form>
        </div>
    );
}

export default ForgotPassword;