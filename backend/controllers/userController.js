const asyncHandler=require("express-async-handler")
const User = require("../models/userModel")
const jwt=require("jsonwebtoken")

const generateToken=(id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"}) 
}
const registerUser=asyncHandler(async(req,res)=>{
   const {name, email, password}=req.body

   //validation
   if(!name||!email||!password){
    res.status(400).json({message:"error all fieldsmust be"})
   }
   // password length
   if(password.length<6){
    res.status(400).json({message:"error all fieldsmust be"})

   }
   //checkif user email already exist
   const userExists=await User.findOne({email})
   if(userExists){
    res.status(400).json({message:"error all fieldsmust be"})
   }



//create new user
const user=await User.create({
    name, email, password
})
//generate token
const token=generateToken(user._id)
res.cookie("token",token,{
    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()+1000*86400),//1 day
    sameSite:"none",
    secure:true
});
if(user){
        const{_id,name,email,photo,phone,bio}=user
        res.status(201).json({
            _id,name,email,photo,phone,bio,token
    })
}else{
    res.status(400).json({message:"error all fieldsmust be"})
    
}
})

module.exports={
    registerUser,
}