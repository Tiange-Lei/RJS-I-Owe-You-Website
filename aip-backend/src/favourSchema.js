const mongoose = require('mongoose');
// ----------------------------------------------------------------------------------------------------------------------

//-------------Create the Schema To Store Users' Favours
const favour = new mongoose.Schema({
    publisher: String,
    text: String,
    award: String,
    createdAt: String,
    isAccepted: Boolean,
    isFinished: Boolean,
    receiver: String,
    picture: String,
    comments: Array,
    follower: Array,
    prove: String,
})
module.exports = mongoose.model('Favour', favour);