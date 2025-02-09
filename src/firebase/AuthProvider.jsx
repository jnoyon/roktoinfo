import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

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
        UserSignOut,
        loading
    }

  return (
    <authContext.Provider value={authInfo}>
        {children}
    </authContext.Provider>
  )
}
