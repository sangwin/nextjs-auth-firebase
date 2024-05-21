"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";
import { authSliceActions, toastSliceActions } from '@/store/store';

import { useRouter } from 'next/navigation';

function Login() {
    const auth = getAuth();
    const { push } = useRouter();
    const dispatch = useDispatch();

    const displayName = useSelector(state => state.authSlice.displayName)

    const [emailVerifiedMsg, setEmailVerifiedMsg] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleResendVerificationEmail = async () => {
        try {
            await sendEmailVerification(auth.currentUser);
            dispatch(toastSliceActions.showToast({
                show: true,
                type: 'success',
                message: "Verification email resent. Please check your inbox.",
                timer: 3000
            }));
        } catch (error) {
            console.error(error.message);
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const done = await signInWithEmailAndPassword(auth, email, password);
            if (done) {
                if (done.user.emailVerified) {
                    dispatch(authSliceActions.setUser(
                        {
                            displayName: done.user.displayName,
                            accessToken: done.user.accessToken,
                            emailVerified: done.user.emailVerified,
                            uid: done.user.uid,
                            email: done.user.email
                        }
                    ));
                    // alert('Login Success : Welcome ' + done.user.displayName);
                    push('/dashboard');
                    dispatch(toastSliceActions.showToast({
                        show: true,
                        type: 'success',
                        message: "Login success : Welcome " + displayName,
                        timer: 3000
                    }));
                } else {
                    setEmailVerifiedMsg(true);
                    dispatch(toastSliceActions.showToast({
                        show: true,
                        type: 'warning',
                        message: "Please verify your email, then Login",
                        timer: 3000
                    }));
                }
            }
        } catch (error) {
            console.error(error.message);
            alert('Login Failed : ' + error.message);
        }
    };

    return (
        <div id="loginForm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                </div>
                {emailVerifiedMsg && <div className="mt-4 text-red-500 text-sm mb-4">
                    Email not verified, <button type='button' className="text-blue-500 hover:underline focus:outline-none" onClick={handleResendVerificationEmail}>Resend verification email</button>.
                </div>}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white float-right font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>

                <Link href="/auth/forgot-password" className="text-blue-500 hover:underline py-2 px-4 ">
                    Forgot Password?
                </Link>
            </form>
        </div>
    );
}

export default Login;