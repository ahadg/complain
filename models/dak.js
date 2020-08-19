const mongoose = require('mongoose');

const dakmodel = mongoose.Schema({
    Department : {
        type : String,
      
    },
    Date : {
       type : Date
    },
    dakdirection  : {
        type : String
       
    },
    dakregister : {
        type : String
    },
    sndorrecvr : {
        type : String
    },
    subject : {
        type : String
    },
  
})

module.exports = dak = mongoose.model('dak',dakmodel);