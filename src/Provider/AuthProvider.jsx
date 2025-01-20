import React, { createContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase/firebase.config";


export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const createUserWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {
        createUserWithEmail,
        errorMessage,
        setErrorMessage,
        user,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;