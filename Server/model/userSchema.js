const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type: String,
  required: true,
  unique: true
     },
     role:{
  type: String,
  required: true,
     },
     
    password:{
        type:String,
        required:true
     },
     cpassword:{
            type:String,
            required:true
      },
      date:{
        type:Date,
        default:Date.now
      },
        messages:[
        {
            name:{
                type:String,
                required:true
                },
            email:{
                type:String,
                required:true
                }, 
            teamName:{
                type:String,
                required:true
                },
            leaderName:{
                type:String,
                required:true
                },
            leaderEmail:{
                type:String,
                required:true
                },
            topic:{
                type:String,
                required:true
                },
            district:{
                type:String,
                required:true
                },
            block:{
                type:String,
                required:true
                }, 
            schoolName:{
                type:String,
                required:true
                },
            schoolCode:{
                type:String,
                required:true
                },
            coordinatorName:{
                type:String,
                required:true
                },
            member1:{
                type:String,
                required:true
                },
            member2:{
                type:String,
                required:true
                },
                approvalStatus: {
                    type: Boolean,
                    default: false, 
                  },
        }
        ],

     tokens:[
        {
            token:{
                type:String,
            required:true
            }
        }
     ]
})

userSchema.pre('save',async function(next){
    console.log("hi from inside");
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);

    }
    next();
});
userSchema.methods.generateAuthToken=async function(){
    try{
    let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
    return token;
    }catch(err){
        console.log(err);
    }
}
userSchema.methods.addMessage=async function(name,
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
    member2){
    try{
        this.messages=this.messages.concat({name,
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
            member2})
            await this.save();
            return this.messages;
    } catch(error){
        console.log(error)
    }
}
const User=mongoose.model('USER',userSchema);
module.exports=User;
