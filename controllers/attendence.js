const contacts = require('../models/contacts');

exports.getweekly = async(req,res) => {
    let attendee = await contacts.findOne({username : req.user.username}).select('attendence');
    console.log(attendee);
 
     let lastseven = attendee.attendence.slice(-7);
     res.status(200).json({
       lastseven
   })
   
   
}
exports.getmonthly = async(req,res) => {
    let attendee = await contacts.findOne({username : req.user.username}).select('attendence');
    console.log(attendee);
 
     let lastthirty = attendee.attendence.slice(-30);
     res.status(200).json({
       lastthirty
   })
   
   
}


exports.myattendence =async (req,res) => {
 //   console.log(req.user);
    let attendee = await contacts.find({username: req.user.username}) 

    var today = new Date();
 let d1 = today.getDate();
 let d2 = today.getMonth()+1; //As January is 0.
 if(d2<10) {
     d2 = "0"+`${d2}`
 }
 let d3 = today.getFullYear()
 if(d1<10) {
     d1 = "0"+`${d1}`
 }
 thevalue = `${d3}`+"-"+`${d2}`+"-"+`${d1}`;
 //console.log(attendee)
 //console.log(attendee[0].attendence)
 let recorded;
 if(attendee[0].attendence.includes(thevalue))
 {
     recorded = true
     console.log('already recorded')

  //   res.status(201).json({
  //       msg : 'already recorded'
   //  })
 }
 else
 {
     recorded = false
   //  let array = [];
     //array.push(thevalue);
   //  console.log(array)
    //    console.log(thevalue)
  //     console.log(attendee.attendence) 
    //    attendee.attendence.push(thevalue);
  //   attendee.attendence = array;
    // console.log(attendee)
    //  await contacts.findOneAndUpdate({username : 'DASD1'}, {
     //     attendence : array
  //    }) 
  //    console.log('no')
 }
 let theuser = req.user.name;
  console.log(recorded)
   res.status(201).render('attendence.ejs',{
    status : 'success',
       recorded,
       theuser,
       therole : req.user.role
   })
}

exports.attendencerecord = async (req,res) => {

console.log('reached')
 //   export function last(array) {
   ///     return array[array.length - 1];
   // }
// for last seven array to 7, then array.length - i




   let attendee = await contacts.find({username: req.user.username}) 

   var today = new Date();
let d1 = today.getDate();
let d2 = today.getMonth()+1; //As January is 0.
if(d2<10) {
    d2 = "0"+`${d2}`
}
let d3 = today.getFullYear()
if(d1<10) {
    d1 = "0"+`${d1}`
}
thevalue = `${d3}`+"-"+`${d2}`+"-"+`${d1}`;
//console.log(attendee)
console.log(attendee[0].attendence)
let recorded;
let recordednotf;
//console.log('hi')
//console.log(attendee[0].attendence.includes(thevalue))
//console.log('hi')

if(attendee[0].attendence.includes(thevalue))
{
    recorded = true;
    recordednotf = true;
    console.log('already recorded')
    res.status(200).json({
        status : 'success',
       recorded,
       recordednotf
    })
}
else
{
    let array = [];
  //  array.push(thevalue);
  //  console.log(array)
  //     console.log(thevalue)
  //    console.log(attendee.attendence) 
     array =  attendee[0].attendence;
     array.push(thevalue);
 //   attendee.attendence = array;
  //  console.log(attendee)
     await contacts.findOneAndUpdate({username : req.user.username}, {
         attendence : array
     }) 
 //    console.log('no')
 recorded = true
 res.status(200).json({
     status : 'success',
    recorded,
    therole : req.user.role
 })

}


}