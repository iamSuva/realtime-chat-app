import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const signupHooks=()=>{
    const [loading,setLoading]=useState(false);
   const{setAuthUser}= useAuthContext();
  
    const signup=async({fullname,username,password,confirmPassword,gender})=>{
        const success=handleInputError({fullname,username,password,confirmPassword,gender});
        if(!success)
        {
          return;
        }
        try {
            setLoading(true);
            //{http://localhost:400/} will be added by proxy
            const response=await fetch("api/auth/signup",{ 
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullname,username,password,confirmPassword,gender})
            });
            const data=await response.json();
            console.log(data);
            if(data.error)
            {
                throw new Error(data.error);
            }
          localStorage.setItem("chatUse",JSON.stringify(data));
          //context
           setAuthUser(data);

            setLoading(false);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return {loading,signup};
}
export default signupHooks;

function handleInputError({fullname,username,password,confirmPassword,gender})
{
    if(!fullname || !username || !password || !confirmPassword || !gender)
    {
        toast.error("Please fill in all fields");
        return false;

    }
    if(password!=confirmPassword)
    {
        toast.error("passwords do not match");
        return false;
    }
    if(password.length<6)
    {
        toast.error("passwords must be at least 6 characters");
        return false;

    }
    return true;
}