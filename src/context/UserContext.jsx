// import { createContext, useState } from "react";
// import { Spinner } from "@nextui-org/react";
import { createContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { em } from "framer-motion/client";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        isLogin: false,
        userInfo: {}
    }); 

    function onAuthChanged(user) {
        if (user) {
            // console.log("user=>", user)
            setUser({
                isLogin: true,
                userInfo: {
                    name: user?.displayName,
                    email: user?.email,
                    photoUrl: user?.photoURL,
                }
            });
        } else {
            setUser({ isLogin: false, userInfo: {} });
        }
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    return(
        <UserContext.Provider value={{user, setUser}}>
             {
                loading ? (
                    <div className="w-full h-96 flex justify-center items-center">
                        {/* <Spinner /> */}
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    children
                )
            }
        </UserContext.Provider>
    )
}

export default UserContextProvider;