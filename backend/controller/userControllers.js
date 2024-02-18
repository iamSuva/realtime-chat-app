const userModel = require("../models/userModel");
const bcrypt=require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");

const handleSignup=async(req,res)=>{
   // console.log("sign up");
    try {
        const {fullname,username,password,confirmPassword,gender}=req.body;
      if(!fullname || !username || !password || !confirmPassword || !gender){
        res.status(400).json({error:"some fileds are empty"});
    }
    if(password.length<6)
    {
        res.status(400).json({error:"password with atleast 6 length"});

    }
    if(password!=confirmPassword)
    {
        return  res.status(400).json({error:"password does not match"});

    }
    const existuser=await userModel.findOne({username});
    if(existuser)
    {
       return res.status(400).json({error:"username already exists"});
    }
     //hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    //
    const boyPic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPic=`https://avatar.iran.liara.run/public/girl?username=${username}`;
    profilePic=gender=="male"?boyPic:girlPic;
    const newUser=new userModel({
        fullname,
        username,
        password:hashedPassword,
        gender,
        profilePic
    });
    console.log(newUser);
    if(newUser){
    //generate token
    generateTokenAndSetCookie(newUser._id,res);
        const user=await newUser.save();
        
        res.status(201).json({
            _id:user._id,
            username:user.username,
            fullname:user.fullname
        })
        
    }else{
        res.status(400).json({error:"Invalid user data"});
    }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}

const handleLogin=async(req,res)=>{
    
    try {
        const {username,password}=req.body;
        const user=await userModel.findOne({username});
        
        console.log("Login user ",user);
        if(!user)
        {
            return res.status(400).json({error:"Invalid username"});
        }
        const isCorrectPassword=await bcrypt.compare(password,user.password);
        if(!isCorrectPassword)
        {
            return res.status(400).json({error:"Invalid user password"});
            
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilePic:user.profilePic
        });
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}
const handleLogout=(req,res)=>{
    res.clearCookie("jwt");
    res.status(201).json({message:"successfully logout"});
}

module.exports={
    handleLogin,handleLogout,handleSignup
}