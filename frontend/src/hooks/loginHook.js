import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";


const loginHook=()=>{
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();
  const login=async(username,password)=>{
    const success=handleInputError({username,password});
    if(!success)
    {
      return;
    }
   
    setLoading(true);
    try {
        const response=await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        });
        const data=await response.json();
       console.log("response",data);
        if(data.error)
        {
            throw new Error(data.error);
        }
      localStorage.setItem("chatUser",JSON.stringify(data));
      setAuthUser(data);
    
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }
  return {loading,login};
}

export default loginHook;

function handleInputError({username,password})
{
    if(!username || !password)
    {
        toast.error("Please fill in all fields");
        return false;

    }
   
    if(password.length<6)
    {
        toast.error("passwords must be at least 6 characters");
        return false;

    }
    return true;
}