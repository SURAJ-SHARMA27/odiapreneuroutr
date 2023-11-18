const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authenticate=require("../middleware/authenticate");
const router=express.Router();
const cookieParser = require("cookie-parser");
const arr = {
    kvs_India: "abcd12@gmail.com",
    school2: "abcd2@gmail.com",
    school3: "abcd3@gmail.com",

  };
router.use(cookieParser());
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
        else if(!arr.hasOwnProperty(name)){
            return res.status(422).json({error:"Institute Name not found"});
        }
        else if(arr[name] !== email){
            return res.status(422).json({error:"Institute name & email not mathed"});

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
            console.log(token);
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

router.get('/about',authenticate,(req,res)=>{
    console.log("hello ji from jwt login")
    res.send(req.rootUser);
});
router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("User logout successfully");
});
router.get('/registeredteams',authenticate,(req,res)=>{
    console.log("hello ji from jwt registeredteams")
    res.send(req.rootUser);
});
router.post('/contact',authenticate,async (req,res)=>{
    console.log("hello ji from registration team")
    try{
const { name,
    email, 
    teamName,
    leaderName,
    leaderEmail,
    topic, 
    district,
    block, 
    schoolName,
    schoolCode,
    coordinatorName,
    member1,
    member2}=req.body;
    if( !name ||
        !email || 
        !teamName ||
        !leaderName ||
        !leaderEmail ||
        !topic || 
        !district ||
        !block || 
        !schoolName ||
        !schoolCode ||
        !coordinatorName ||
        !member1 ||
        !member2){
            console.log("error in the form itself");
            return res.json({error:"Fill the form"});
        }
        const userContact=await User.findOne({_id:req.userID});
        if(userContact){
            const userMessage=await userContact.addMessage( name,
                email, 
                teamName,
                leaderName,
                leaderEmail,
                topic, 
                district,
                block, 
                schoolName,
                schoolCode,
                coordinatorName,
                member1,
                member2);
        }
        await userContact.save();
        res.status(201).json({message:"Team registered successfully"});

    }catch(error){
console.log(error);
    }
});
module.exports=router;