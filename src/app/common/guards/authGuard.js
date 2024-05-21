"use client"

import { useState } from "react";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/store/store';

const withAuth = (WrappedComponent) => {
    const AuthGuard = (props) => {
        const { push } = useRouter();
        const [userData, setUserData] = useState(null)

        useEffect(() => {
            const auth = getAuth(firebaseApp);
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (!user) {
                    push('/auth');
                } else {
                    setUserData(user);
                }
            });

            return () => unsubscribe(); // Unsubscribe when component unmounts
        }, []);

        return <WrappedComponent {...props} user={userData} />;
    };

    return AuthGuard;
};

export default withAuth;