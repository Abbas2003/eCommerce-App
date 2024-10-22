import { Flex, Spin } from 'antd';
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingOutlined } from '@ant-design/icons';
import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();
export const useAuth = () => useContext(UserContext); // Custom hook for easy access

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
                    id: user?.uid
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
                    <div className="w-full min-h-screen flex justify-center items-center">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                        {/* <h1>Loading...</h1> */}
                    </div>
                ) : (
                    children
                )
            }
        </UserContext.Provider>
    )
}

export default UserContextProvider;