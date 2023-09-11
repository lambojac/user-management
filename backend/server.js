const dotenv=require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const cors=require("cors")

const app=express()
const PORT=process.env.PORT||5000
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