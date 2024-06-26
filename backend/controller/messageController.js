const conversationModel = require("../models/conversationModel");
const messageModel = require("../models/messageModel");
const {getReceiverSocketId, io} = require("../socket/socketio");


 const sendMessage=async(req,res)=>{
   try {
    const {message}=req.body;
    const {receiverId}=req.params;
    const senderId=req.user._id;

 console.log(senderId+" -to "+receiverId);
    //finding conversation btw sender-receiver
    let conversation=await conversationModel.findOne({
        participants:{$all:[senderId,receiverId]}
    })
  //if no conversation found create one
  if(!conversation)
  {
    conversation=await conversationModel.create({
        participants:[senderId,receiverId]
    })
  }
 const newMessage=new messageModel({
    senderId,
    receiverId,
    message
 });
 if(newMessage)
 {
    conversation.messages.push(newMessage._id);
 }


 await conversation.save();
 await newMessage.save();
 //both will run parallel
 //  await Promise.all([conversation.save(),newMessage.save()]);
 //socket io will be added here
 const reciverSocketId=getReceiverSocketId(receiverId);
 if(reciverSocketId){
  
  //this is used to send event to specefic client
  io.to(reciverSocketId).emit("newMessage",newMessage)
 }


 //return the message
 res.status(201).json(newMessage);

   } catch (error) {
    console.log("error in sending message ",error.message);
    res.status(500).json({error:"Internal server error"});
}
}
//msg btww2 users
const getMessagesOfTwo=async(req,res)=>{
    try {
        const {receiverId}=req.params;
        const senderId=req.user._id;
        const conversation=await conversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages");
      if(!conversation)
      {
        //res.status(404).json({message:"No conversation found"});
      return res.status(200).json([]);
      }
      res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("error in sending message ",error.message);
        res.status(500).json({error:"Internal server error"});
        
    }
}
module.exports={
    sendMessage,
    getMessagesOfTwo
}