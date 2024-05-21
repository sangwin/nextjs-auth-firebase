"use client"

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { toastSliceActions } from '@/store/store';
import { useDispatch } from "react-redux";

function Register(props) {
    const auth = getAuth();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const done = await createUserWithEmailAndPassword(auth, email, password);
            if (done) {
                await updateProfile(done.user, { displayName: name, photoURL: '' });
                await sendEmailVerification(done.user);

                dispatch(toastSliceActions.showToast({
                    show: true,
                    type: 'success',
                    message: 'Verification email sent on : ' + email + '. Please check',
                    timer: 10000
                }));

                props.handleTabClick('login');
            }

        } catch (error) {
            console.error(error.message);
            alert('Register Failed : ' + error.message);
        }
    };

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    return (
        <div id="registerForm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="name" id="name" name="name" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your name" value={name} onChange={handleNameChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
                    {password && !isPasswordValid && <p className="text-red-500 text-xs mt-1">Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.</p>}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 float-right text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
            </form>
        </div>
    );
}

export default Register;