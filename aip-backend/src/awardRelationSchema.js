const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//-----------------------Create Schema To Store The Information of Awards and User Relationship In Award-------------------
const awardsRelationSchema = new Schema({
    favourID: String,
    debtor: String,
    creditor: String,
    award: String
});

module.exports = mongoose.model('AwardRelation',awardsRelationSchema);


