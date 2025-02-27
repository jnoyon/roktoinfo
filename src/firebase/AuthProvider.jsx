import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const authContext = createContext(null);

const googleProvider  = new GoogleAuthProvider();

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    // Update User
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }
    const UserSignOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=> {
       const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);    
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])



    const authInfo = {
        user,
        createUser,
        signInUser,
        googleSignIn,
        updateUser,
        UserSignOut,
        loading
    }

  return (
    <authContext.Provider value={authInfo}>
        {children}
    </authContext.Provider>
  )
}
