
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema(
  {
    username: String,
    numberOfAward: Number
  },
  { timestamps: true })


module.exports = mongoose.model('UserInfo', userInfoSchema);