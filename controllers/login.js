let bcrypt = require('bcrypt');
let user= require('../models/contacts');
const jwt =  require('jsonwebtoken');
const promisify = require('util');
const mongoose = require('mongoose')

exports.loginme = (req,res) => {
    res.status(201).render('login.ejs')
}

exports.verifylogin = async (req,res) => {
    if(!req.body.body.password || !req.body.body.usname)
    {
        res.status(200).json({
            status : 'Error',
            msg : 'Input all field'
        })
    }
    let theuser = await user.findOne({username : req.body.body.usname})
    if(!theuser)
    {
        res.status(200).json({
            status : 'Error',
            msg : 'User not found'
        })
    }
 console.log(req.body);
 console.log(theuser)
    let result = await bcrypt.compare(req.body.body.password,theuser.password);
    console.log(result);
    if(!result)
    {
        res.status(200).json({
            status : 'Error',
            msg : 'Password is invalid'
        })
    }
   let token = await jwt.sign({ data :` ${theuser._id}`},
    'secret',{expiresIn : '5h'});

        const cookieOptions = {
          
            expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
//httpOnly : true,
           
           
          };
          res.cookie('jwt',token,cookieOptions);

    if(result)
    {
        res.status(200).json({
            status : 'success'
        })
    }
}

exports.protect= async (req,res,next) => {
    let token = req.cookies.jwt;
 //  console.log(req.cookies)
    if(!token)
    {
        res.writeHead(302, {
            'Location': 'loginme'
            //add other headers here...
          });
          res.end();
      //  res.status(200).json({
       //     status : 'Unauthorized'
       // })
    }
    let myid;
    const decode = await jwt.verify(token,'secret', (err,decode) => {
        if(err)
        {
            // token expired error than redirect to another page
            console.log(err)  
            res.writeHead(302, {
                'Location': 'loginme'
                //add other headers here...
              });
              res.end();   
        }
        else
        {
            console.log(decode);
            myid = decode.data;
        }
      

    });
  
 // myid =  myid.replace(/^\s+|\s+$/gm,' ');
 // console.log(typeof(myid))
 // console.log(myid);
 // console.log(`${myid}`)
  myid =  myid.replace(/^\s+|\s+$/gm,'');
 // console.log(myid);
//   console.log(mongoose.Types.ObjectId.isValid(myid))
  // console.log(myid);
  // console.log(mongoose.Types.ObjectId.isValid('5f1fc5658f598d12a06df0d3'))
   //  
   //ObjectId.fromString(myid);
   //mongoose.Types.ObjectId.fromString(myid)
 //  res.writeHead(302, {
 //   'Location': 'login'
    //add other headers here...
 // });
//  res.end();
   const currentuser = await user.findOne({
       _id : myid
   });
     if(!currentuser){
        res.status(200).json({
            status : 'Unauthorized'
        })
     }
     req.user = currentuser;
    // res.locals.user = currentuser;
   //console.log(res.locals.user); 
      next();
}