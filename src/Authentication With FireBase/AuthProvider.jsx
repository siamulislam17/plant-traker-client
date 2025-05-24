import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";




import React, { useEffect } from 'react';
import AuthContext from './AuthContext';
import { auth } from "./firebase.config";

const AuthProvider = ( {children} ) => {

    const provider = new GoogleAuthProvider();

    
    const [user, setUser] = React.useState(null);
    const createAccount = (email,password) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }

    

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
  
        setUser(user)
  
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
        LogIn
    }
    return (
        <div>
            <AuthContext value={userData}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;