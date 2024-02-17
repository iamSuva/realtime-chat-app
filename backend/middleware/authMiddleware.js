const jwt=require("jsonwebtoken");
const userModel = require("../models/userModel");
const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({error:"Unauthorized user is try to access login first"});
        }
        const verified=jwt.verify(token,process.env.JWT_SECRET);
       
     if(!verified)
        {
            return res.status(401).json({error:"Invalid token"});
        }
        const user=await userModel.findById(verified.userId).select("-password");
        if(!user)
        {
            return res.status(404).json({error:"user not found"});
            
        }
        req.user=user;
        next();

    } catch (error) {
        console.log("error in auth middleware",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}
module.exports=authMiddleware;