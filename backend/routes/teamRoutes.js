const express= require('express');
const bcrypt= require('bcryptjs');
const expressAsyncHandler= require('express-async-handler');
const jwt= require('jsonwebtoken');
const User= require('../model/userModel.js');
const TeamLeader= require('../model/teamLeaderModel.js');
const {Team,TeamMember}= require('../model/teamModel.js');
const { isAuth, isAdmin, generateToken,accessIsTeamLeader }= require('../utils.js');

const teamRouter = express.Router();
  
  teamRouter.post('/create-team', isAuth, accessIsTeamLeader, async (req, res) => {
    try {
        const newTeam = new Team({
          teamName: req.body.teamName,
          teamLeader: req.body.teamLeader, 
        });
        const createdTeam = await newTeam.save();
        res.status(201).json({
          _id: createdTeam._id,
          teamName: createdTeam.teamName,
          teamLeader: createdTeam.teamLeader,
        });
    } 
    catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  // Route to add team members
  teamRouter.post('/add-member', isAuth, accessIsTeamLeader, async (req, res) => {
    try {
        const newMember = new TeamMember({
          memberName: req.body.memberName,
          memberDetails: req.body.memberDetails,
        });
  
        const createdMember = await newMember.save();
  
        res.status(201).json({
          _id: createdMember._id,
          memberName: createdMember.memberName,
          memberDetails: createdMember.memberDetails,
        });
      
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports =teamRouter ;