const express= require('express');
const bcrypt= require('bcryptjs');
const expressAsyncHandler= require('express-async-handler');
const jwt= require('jsonwebtoken');
const TeamLeader= require('../model/teamLeaderModel.js');
const User= require('../model/userModel.js');
const { isAuth, isAdmin, generateToken }= require('../utils.js');

const teamLeaderRouter = express.Router();

teamLeaderRouter.put(
    '/register',isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {

          user.isTeamLeader=true;
          await user.save();
          res.send({ message: 'user Updated' });
                return;    
        }
        res.status(401).send({ message: 'Invalid email or password' });
    })
    );
  module.exports =teamLeaderRouter ;