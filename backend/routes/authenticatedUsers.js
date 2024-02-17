const express=require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {getAllusers}=require("../controller/chattingUserController");
const router=express.Router();


router.get("/",authMiddleware,getAllusers);






module.exports=router;