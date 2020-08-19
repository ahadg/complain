const mongoose = require('mongoose');

const issuemodel = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'contacts',
       
    },
    issueid : {
        type : Number,
      unique : true
    },
    issuedate  : {
       type : Date
    },
    issuedetails : {
        type : String
    },
    assignedusername : {
        type : String
    },
    status : {
        type : String,
        default : 'Pending'
    }
   
})

module.exports = dak = mongoose.model('issue',issuemodel);