const mongoose = require('mongoose');
//------create the schema for user information and record the number favours accepted by users------
const userInfoSchema = new mongoose.Schema(
  {
  username:String,
  numberOfAward:Number
  }, 
  {timestamps: true})


module.exports = mongoose.model('UserInfo', userInfoSchema);