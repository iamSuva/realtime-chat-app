const express=require("express");
const dotenv=require("dotenv");
const app=express();
dotenv.config();
const connectTodb = require("./db/connectTodb");
const port=process.env.PORT || 5000;

const userRoutes=require("./routes/userRoutes");
const messageRoutes=require("./routes/messageRoutes");
const authenticatedUsers=require("./routes/authenticatedUsers.js")
const cookieParser = require("cookie-parser");
//connection


connectTodb();
app.use(cookieParser()); //parse cookie
app.use(express.json());//to parse the incoming req with json payloads(req.body)

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/allusers",authenticatedUsers);





app.listen(port,(err)=>{
    console.log(`runnig on port ${port}`);
})