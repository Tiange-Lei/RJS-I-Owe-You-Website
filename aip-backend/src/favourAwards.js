const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awardsSchema = new Schema({
    debtor: { type: Schema.Types.ObjectId, ref: 'UserInfo'},
    creditor: { type: Schema.Types.ObjectId, ref: 'UserInfo'},
    award: {type:String, required: true}
});

module.exports = mongoose.model('Awards',awardsSchema);


