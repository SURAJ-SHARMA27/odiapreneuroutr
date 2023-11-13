const mongoose=require('mongoose');
const express=require('express');
const app=express();
const DB=process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log('connection successful');
}).catch((err)=> console.log("no connection"))
app.get('/',(req,res)=>{
    res.send("hello this is server");
});