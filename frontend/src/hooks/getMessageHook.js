import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

function getMessageHook() {
   const [loading,setLoading]=useState(false);
   const {messages,setMessages,selectedConversation}=useConversation();

   useEffect(()=>{
       const getMessage=async()=>{
        setLoading(true);
        try {
            const res=await fetch(`/api/messages/${selectedConversation._id}`);
            const data=await res.json();
           console.log(data);
            if(data.error)
            {
                throw new Error(data.error);
            }
            setMessages(data);
        } catch (error) {
            toast.error(error.messages);
            
        }finally{
            setLoading(false);
        }
       }
       if(selectedConversation?._id)
       {
        getMessage();
       }
   },[selectedConversation?._id,setMessages]);

return {loading,messages};
}

export default getMessageHook
