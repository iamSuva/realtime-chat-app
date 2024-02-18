import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function Singleconversation({conversation,lastindex}) {
   const {selectedConversation,setSelectedConversation}=useConversation();
 
   const isSelected=selectedConversation?._id === conversation._id;
   const {onlineUsers}= useSocketContext();
   const isOnline=onlineUsers.includes(conversation._id);

   return (
    <>
      <div
        className={`flex gap-2 items-center rounded-sm
    p-2 cursor-pointer ${isSelected? "bg-sky-300":""}`}
     onClick={()=>setSelectedConversation(conversation)}
    
    >
        <div className={`avatar ${isOnline?"online":""}`}>
          <div className="w-10 rounded-full">
            <img src={conversation.profilePic} alt="profile"/>
          </div>
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">
                   {conversation.fullname}
                </p>
                <span className="tetx-xl">💙</span>
            </div>
        </div>
      </div>
     {!lastindex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}

export default Singleconversation;
