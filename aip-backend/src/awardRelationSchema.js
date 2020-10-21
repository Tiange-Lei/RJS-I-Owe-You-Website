const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awardsRelationSchema = new Schema({
    favourID: String,
    debtor: String,
    creditor: String,
    award: String
});

module.exports = mongoose.model('AwardRelation',awardsRelationSchema);


