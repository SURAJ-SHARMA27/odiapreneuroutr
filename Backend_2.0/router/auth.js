const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const router=express.Router();
require('../db/conn');
const User=require("../model/userSchema");
router.get('/',(req,res)=>{
    res.send('Hello this is from auth');
})
router.post('/register', async (req,res)=>{
    const { name,email,password,cpassword }=req.body;
    if(!name||!email||!password||!cpassword){
        return res.status(422).json({error:"Fill the required fields"});
    }
   
    try {
        const userExist= await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"Email already exist"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"passwords are not matching"});
        }
        else{
            const user=new User({name,email,password,cpassword});
            await user.save();
            res.status(201).json({message:"user registered successfully"});
        }
        
    } catch (err) {
        console.log(err);
    }
   
    
})
router.post("/signin",async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({error:"Data not filled correctly"});

        }
        const userLogin=await User.findOne({email:email});
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            const token=await userLogin.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            })
            if(!isMatch){
                res.status(400).json({error:"Invalid credentials"});
            }
            else{
                res.json({message:"user signin successfully"});
            }
        }else{
            res.status(400).json({error:"Invalid credentials"});

        }
       
    } catch (err) {
        comsole.log(err)
    }
})
module.exports=router;