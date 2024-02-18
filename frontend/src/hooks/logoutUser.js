import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"

const logoutUser=()=>{
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();
    const logout=async()=>{
        try {
            setLoading(true);
            const response=await fetch("/api/auth/logout");
            const data=await response.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            localStorage.removeItem("chatUser");
            setAuthUser(null);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
        }
    };
    return {loading,logout};
    
};
export default logoutUser;