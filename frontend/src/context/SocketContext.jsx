import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
export const SocketContext=createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider=({children})=>{
  const [socket,setSocket]=useState(null);
  const [onlineUsers,setOnlineUsers]=useState([]);
 const {authUser}=useAuthContext();

  useEffect(()=>{
    if(authUser)
    {
        const socket=io("http://localhost:4000",{
            query:{
                userId:authUser._id
            }
        });
        setSocket(socket);
        //socket.on is used listen to the events can be used on both client and serve

        socket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users);
        })

        //function unmount socket will be closed
        return ()=>socket.close();
    }else{ //no authenticated user but socket conn is on then close it
        if(socket)
        {
            socket.close();
            setSocket(null);
        }
    }
  },[authUser]);
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}