const mongoose=require('mongoose');

const teamLeaderSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      resetToken: { type: String },
      isTeamLeader: { type: Boolean, default:true, required: true },
    },
    {
      timestamps: true,
    }
  );
  module.exports=mongoose.model("TeamLeader", teamLeaderSchema);