const mongoose=require("mongoose");
const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

const messageModel=mongoose.model("message",messageSchema);
module.exports=messageModel;