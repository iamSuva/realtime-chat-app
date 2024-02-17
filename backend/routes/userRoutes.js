const express=require("express");
const { handleSignup, handleLogin, handleLogout } = require("../controller/userControllers");

const router=express.Router();


router.post("/signup",handleSignup);
router.post("/login",handleLogin);
router.get("/logout",handleLogout);
console.log("");
module.exports=router;