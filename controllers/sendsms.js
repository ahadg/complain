const users = require('../models/contacts');
const client = require('twilio')('ACa05fc77eec3f2c304c67392e27c794d1', '277614b2e5269f4fc1f2b72a7e0aac84');

exports.sendpage = async (req,res) => {
    if(req.user.role == 'admin' || req.user.role == 'sadmin')
    {

        let alluser = await users.find();
        console.log(alluser);
       res.status(200).render('sms.ejs', {
           alluser,
           theuser : req.user.name,
           therole : req.user.role
       })
     
    }
    else 
    {
        res.writeHead(302, {
            'Location': 'loginme'
            //add other headers here...
          });
          res.end();
    }
   
}

exports.sendsms = async (req,res) => {
    console.log(req.body);
    try {
        req.body.result.forEach(element => {
            client.messages.create({
                to: `+${element}`,
                from: '+12565489804',
                body : req.body.message
              }).then(messages => console.log(messages.sid));
        });
        res.status(200).json({
            status : 'success'
        })     
    } catch (error) {
        console.log(error)
    }
   
}