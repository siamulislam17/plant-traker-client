import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";




import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { auth } from "./firebase.config";

const AuthProvider = ( {children} ) => {

    const provider = new GoogleAuthProvider();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const createAccount = (email,password) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateProfileData = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
      };

    const LogIn = (email, password) => {
       return signInWithEmailAndPassword(auth, email, password)
      };
    const signInWithGoogle = () => {
       return signInWithPopup(auth, provider);
      };

      const logOut = () => {
        return signOut(auth);
      };


    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, (user) => {
  
        setUser(user);
        setLoading(false);
  
        console.log(user);
 
        });

        return ()=>{
            unsubscribe()
        } 
    },[])  

   const userData={
        createAccount,
        signInWithGoogle,
        user,
        setUser,
        logOut,
        LogIn,
        loading,
        setLoading,
        updateProfileData
    }
    return (
        <div>
            <AuthContext value={userData}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;