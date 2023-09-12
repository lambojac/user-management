const registerUser=(req,res)=>{
    if(!req.body.email){
        res.status(400)
    }
    res.send("register user")
}

module.exports={
    registerUser,
}