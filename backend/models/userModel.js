const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
name:{
    type:String,
    required:[true,"please add a name field required"]
},
email:{
    type:String,
    required:[true,"please add an email"],
    unique:true,
    trim:true,
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please enter a valid email"]
},
password:{
    type:String,
    required:[true,"please add a password"],
    minlength:[6,"password must be up to 6 character"],
    maxlength:[23,"passwrod must not be more than 23 characters"]
},
photo:{
    type:String,
    required:[true,"please enter a photo"],
    default:""
},
phone:{
    type:String,
    default:"+234"
},
bio:{
type:String,
maxlength:[230,"bio must not be more than 230 characters"]
}
},{timestamps:true})

userSchema.pre("save", async function(next){
if(!this.isModified("password")){
    return next()
}

const salt=bcrypt.gensalt(10)
const hashedPassword=await bcrypt.hash(this.password,salt)
this.password=hashedPassword;
next();
})

const User=mongoose.model("user",userSchema)
module.exports=User