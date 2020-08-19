const mongoose = require('mongoose');

const contactmodel = mongoose.Schema({
    cnumber : {
        type : String,
        unique : true
    },
    cnic : {
        type : String,
        unique : true
    },
    name  : {
        type : String,
       
    },
    smstype : {
        type : String
    },
    Group : {
        type : String
    },
    Department : {
        type : String
    },
    username : {
        type : String,
        unique : true
    },
    attendence : {
        type : Array
    },
    password : {
        type : String
    },
    role : {
        type : String,
        default : 'user'
    }
},
{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
}
)

contactmodel.virtual('issues', {
    ref : 'issue',
    foreignField : 'user',
    localField : '_id'
 })

module.exports = contacts = mongoose.model('contacts',contactmodel);