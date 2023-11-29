import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
const provider = new GoogleAuthProvider();

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const signIn = (email, password) => {

        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)


    }
    const googlesignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
               
                const userInfo = { email: currentUser.email }
                //jwt request
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        // console.log(res.data.token)
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }

        })
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo = { user, loading, createUser, signIn, logOut, googlesignIn }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;