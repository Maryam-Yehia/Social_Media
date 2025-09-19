import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const userContext = createContext(null);

export default function UsercontextProvider({children}) {
    const [userData , setUserData] = useState();

    async function getDataUser(token) {
        try {
            const {data} = await axios(`${import.meta.env.VITE_BASE_URL}/users/profile-data`,
                {
                    method:"GET",
                    headers:{token:token}
                }
            )
            setUserData(data?.user);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDataUser
    },[])

    const val = {
        userData,
        getDataUser,
        setUserData
    }
return (
    <userContext.Provider value={val}>
        {children}
    </userContext.Provider>
)
}
