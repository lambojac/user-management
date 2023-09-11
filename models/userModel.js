const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
name:{
    type:String,
    required:[true,"please add a name field required"]
},
email:{
    type:string,
    required:[true,"please add an email"],
    unique:true,
    trim:true,
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please enter a valid email"]
},
password:{
    type:string,
    required:[true,"please add a password"],
    minlength:[6,"password must be up to 6 character"],
    maxlength:[23,"passwrod must not be more than 23 characters"]
},
photo:{
    type:string,
    required:[true,"please enter a photo"],
    default:""
}
})

const User=mongoose.model("user",userSchema)
module.exports=User