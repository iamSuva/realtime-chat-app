import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';

function listenToMessageHook() {
     const {socket}=useSocketContext();
     const {messages,setMessages}=useConversation();

     useEffect(()=>{
     socket?.on("newMessage",(newMessage)=>{
        setMessages([...messages,newMessage]);
     })

     //function unmount
     return ()=>socket?.off("newMessage");

     },[socket,setMessages,messages]);
}

export default listenToMessageHook