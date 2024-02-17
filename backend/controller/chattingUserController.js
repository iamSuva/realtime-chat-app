const userModel = require("../models/userModel");

const getAllusers=async(req,res)=>{
    try {
        const loginuserId=req.user._id;
        //get all users excepts login user
        const allUsers=await userModel.find({
            _id:{$ne:loginuserId}
        }).select("-pssword");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log("erorr in "+error.message);
        res.status(500).json({error:"Internal error in server"})
    }

}


module.exports={
    getAllusers
}