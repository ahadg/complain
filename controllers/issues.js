const users = require('../models/contacts');
const issue= require('../models/issue');
const { findOne } = require('../models/contacts');

exports.searchwithcnic = async (req,res) => {
//  console.log(req.body.val)
 /// console.log(Number(req.body.val))
  //console.log(typeof(Number(req.body.val)))
 // let theuser  = await users.find({ cnic : {$regex : new RegExp(req.body.val)}})
  try {
 // i think it only search string value,, so converting to string then searching
 let theuser  = await users.find({ cnic : {$regex : new RegExp(req.body.val)}}).populate('issues')

  console.log(theuser)
      //new RegExp(Number(req.body.val))}})
    res.status(200).json({
      theuser
    })
  } catch (error) {
    console.log(error)
  }
}

exports.updatestatus = async (req,res) => {
  console.log(req.body);
try {
 let theissue =  await issue.findOne({issueid : req.body.id})
 theissue.status = 'complete';
 theissue.save();
 //console.log(theissue)
 res.status(200).json({
    status : 'success'
  })  
} catch (error) {
  console.log(error)
  res.status(200).json({
    status : 'error'
  })
}
}



exports.issuepage =async (req,res) => {
  if(req.user.role != 'clerk')
  {
    res.writeHead(302, {
      'Location': 'loginme'
      //add other headers here...
    });
    res.end();
  }
 let allusers = await users.find();
  res.status(200).render('createissue.ejs', {
      allusers,
      theuser  : req.user.name
  });
}

exports.forwadedissue = async (req,res) => {
  console.log(req.user);
  console.log(req.user.cnic)
  if(req.user.role != 'user')
  {
    res.writeHead(302, {
      'Location': 'loginme'
      //add other headers here...
    });
    res.end();
  }
  let allissues = await issue.find({assignedusername : req.user.username })
  console.log(allissues)
  res.status(200).render('manageissue.ejs', {
    allissues,
    therole : req.user.role,
    theuser  : req.user.name
  });
}

exports.assignissue = async (req,res) => {
  console.log(req.body);
  try {
    let theissue = await issue.findOne({issueid : req.body.issueid1});
    theissue.assignedusername = req.body.user;
    theissue.status = 'inprogress';
   //  await issue.findOneAndUpdate({ issueid : req.body.issueid1, assignedusername : req.body.user })
theissue.save();
    res.status(200).json({
      status : 'success'
    })
  } catch (error) {
    console.log(error)
  }

}

exports.allissuepage = async (req,res) => {
  if(req.user.role != 'admin')
  {
    res.writeHead(302, {
      'Location': 'loginme'
      //add other headers here...
    });
    res.end();
  }
  let theusers = await users.find().populate('issues');
  let allusers = await users.find();
 // console.log(theusers)
  res.status(200).render('issuepage.ejs', {

    theusers,
    allusers,
    theuser : req.user.name
  })
}

exports.createissue = async (req,res) => {
  console.log(req.body);
  let theusers = await users.find().populate('issues');
  console.log(theusers)
  res.status(200).json({
    theusers
  }) 
  let theuser = await users.findOne({cnic : req.body.theuser}).populate('issues')
  console.log(theuser);
  const citystats = await issue.aggregate([
        
    {
    $group : {
        // create city
        _id : '',
        total : { $sum : 1},
      
    }
    }
  ])
  //console.log(citystats)
let theid;
   if (!(citystats[0])) {
     theid = 0
   }
   else {
    theid = (citystats[0].total)+1
   }


  let date = (new Date)
  let newissue = await issue.create({
    issueid : theid
 ,
    issuedate : date,
    issuedetails : req.body.issued,
    user : theuser._id
  })
  console.log('reached issue')
  res.status(200).json({
    status : 'success',
    newissue
  }) 
  
}