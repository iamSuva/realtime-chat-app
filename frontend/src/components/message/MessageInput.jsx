import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import sendMessageHook from "../../hooks/sendMessageHook";
function MessageInput() {
  const [message,setMessage]=useState("");
  const {loading,sendMessage}=sendMessageHook();
 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!message)
    {
      return;
    }
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className="px-4 py-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5
        bg-gray-700 border-gray-600 text-white"
          placeholder="Send a Message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 px-3 flex items-center"
        >
        {  loading?<div className="loading loading-spinner"></div>:<BsSend />}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
