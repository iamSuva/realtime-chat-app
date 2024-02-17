const jwt=require("jsonwebtoken");

const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1h"});

//setcookie
res.cookie("jwt",token,{
    maxAge:24*60*60*1000,//1day
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV!=="development"
})
}

module.exports=generateTokenAndSetCookie;