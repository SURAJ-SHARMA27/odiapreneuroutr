const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.send("hello this server is running");
})
console.log("suraj")