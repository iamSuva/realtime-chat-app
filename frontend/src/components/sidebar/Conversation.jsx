import React from 'react'
import Singleconversation from './Singleconversation'
import useGetConversation from '../../hooks/useGetConversation'

function Conversation() {
  const {loading,conversations}= useGetConversation();
  console.log("conversations ",conversations);
  return (
    <div 
    className='py-2 flex flex-col 
    overflow-auto'>
       {loading?<span className='loading loading-spinner mx-auto'></span>:null}
       {
        conversations.map((conversation,index)=>(
          <Singleconversation
          key={conversation._id}
          conversation={conversation}
          lastindex={index===conversations.length-1}
          />
        ))
       }
        </div>
  )
}

export default Conversation