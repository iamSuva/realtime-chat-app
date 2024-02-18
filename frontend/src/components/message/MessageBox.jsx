import React, { useEffect, useRef } from 'react'
import Message from './Message'
import getMessageHook from '../../hooks/getMessageHook'
import Messageskletons from '../skeletons/Messageskletons';
import listenToMessageHook from '../../hooks/listenToMessageHook';

function MessageBox() {
  listenToMessageHook();
  const {loading,messages}=getMessageHook();
   console.log("messages ",messages);
   const lastMessageRef=useRef();
 useEffect(()=>{
  setTimeout(()=>{
    lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
  },100)
 },[messages]);
 
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {!loading && messages.length>0 
        && messages.map((message)=>(
          <div key={message._id} ref={lastMessageRef}>

          <Message message={message}/>
          </div>
        ))
           
        }
       {loading && <Messageskletons/>}
       {!loading && messages.length==0 &&
       (<p className='text-center'>Please start conversation by sending message.</p>)
        }
    </div>
  )
}

export default MessageBox;


// import React from 'react'
// import Message from './Message'
// import getMessageHook from '../../hooks/getMessageHook'

// function MessageBox() {
//   const {loading,messages}=getMessageHook();
//  console.log("messages ",messages);
 
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
        
//     </div>
//   )
// }

// export default MessageBox