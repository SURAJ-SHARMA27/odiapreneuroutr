const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Team Member
const teamMemberSchema = new Schema({
  memberName: { type: String, required: true },
  memberDetails: { type: String, required: true },
  email:{ type: String }
});

// Define the schema for Team
const teamSchema = new Schema({
  teamName: { type: String, required: true },
  teamLeader: { type: String, required: true },
  email:{ type: String }
    
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
const Team = mongoose.model('Team', teamSchema);

module.exports = { TeamMember, Team };


