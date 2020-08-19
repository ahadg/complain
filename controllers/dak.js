const Dak = require('../models/dak');
const moment = require('moment');


exports.dakpage = async (req,res) => {
    if( req.user.role != 'clerk')
    {
        res.writeHead(302, {
            'Location': 'loginme'
            //add other headers here...
          });
          res.end();
    }
    try {
        let alldak = await Dak.find();
       // console.log(alldak)
        res.status(200).render('adddak.ejs', {
            alldak,
            theuser : req.user.name,
            moment
        })      
    } catch (error) {
        console.log(error)
    }
  
}

exports.savedak = async (req,res) => {
     console.log(req.body);
     try {
         let newdak = await Dak.create(req.body);
         res.status(200).json({
             status :'success',
             newdak
         })
     } catch (error) {
         console.log(error)
     }
}

exports.search = async (req,res) => {
    console.log(req.body)
    try {
   //     let result = await Dak.find({ subject : req.body.theval});
   let result = await Dak.find({ subject : {$regex : new RegExp(req.body.theval)}})  
   console.log(result)
        res.status(200).json({
            status : 'success',
            result
        })
    } catch (error) {
        console.log(error)
    }
}