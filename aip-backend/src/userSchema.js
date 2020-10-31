const mongoose = require('mongoose');
//--------create the schema for user login information-------
const user = new mongoose.Schema({
    username: String,
    password: String,
})
module.exports = mongoose.model('User',user);
