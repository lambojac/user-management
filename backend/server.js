const dotenv=require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors")
const userRoute=require("./routes/userRoute")
const app=express()
const errorHandler=require("./middleware/errormiddleware")
const cookieParser=require("cookie-parser")
//middlewares
app.use(express.json)
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
//Routes

//routes middleware
app.use("api/users",userRoute)

app.get("/home",(req,res)=>{
    res.send("home page")
})

// errormiddlwarre

const PORT=process.env.PORT||4000
mongoose.connect('mongodb+srv://kennie:869480Ak@cluster0.zkjbfkp.mongodb.net/pevents?retryWrites=true&w=majority'
,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log(`connected successfully`)
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})