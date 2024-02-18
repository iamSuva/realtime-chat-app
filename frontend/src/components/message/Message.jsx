import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';

function Message({message}) {
  console.log("mymsg ",message.message);
  const{authUser}= useAuthContext();
  console.log("auth ",authUser);
  const {selectedConversation}=useConversation()
   const ismychat=message.senderId==authUser._id;

   const chatclass=ismychat?"chat-end":"chat-start";
   const profilePic=ismychat ? authUser.profilePic:selectedConversation?.profilePic;
  const bubbleBgcolor=ismychat? "bg-blue-400":"";
  const date=new Date(message.createdAt);
  const hours=date.getHours();
  const minutes=date.getMinutes();

  return (
    <div className={`chat ${chatclass}`}>
           <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
            </div>
           </div>
           <div className={`chat-bubble text-white ${bubbleBgcolor} pb-2`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{`${hours}:${minutes}`}</div>
    </div>
  )
}

export default Message