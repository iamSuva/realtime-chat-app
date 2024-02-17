const express=require("express");

const router=express.Router();
const {sendMessage,getMessagesOfTwo}=require("../controller/messageController");
const authMiddleware=require("../middleware/authMiddleware")


router.post("/send/:receiverId",authMiddleware,sendMessage);
router.get("/:receiverId",authMiddleware,getMessagesOfTwo);

module.exports=router;