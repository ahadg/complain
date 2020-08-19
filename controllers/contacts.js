const contact = require('../models/contacts');
const exportFromJSON = require('export-from-json')
const xlsx = require('xlsx');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.createcontactspage = async (request,response) => {
 //   console.log(req.body);
 if(request.user.role != 'sadmin')
 {
    response.writeHead(302, {
        'Location': 'loginme'
        //add other headers here...
      });
      response.end();
 }
    let contacts = await contact.find().populate('issues');
    console.log(contacts);
  response.status(201).render('user.ejs', {
      thecontacts : contacts,
      theuser : request.user.name
  })
   // const data = [{name:"ahad", number :'23523'},{name:"imran", number :"553442"},{name:"aqib", number : "23532"}]
 /*let data2 = xlsx.utils.json_to_sheet(data);
 console.log(data2)
 var wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, data2, "People");


let hjj = xlsx.write(wb, {bookType:'xlsx', type:'buffer'});
response.write(hjj)
response.end() 
    //  const data = 
   // [{ foo: 'foo',
   // foo2 : 'yoo',
   //foo3 : 'tt'

//}, { bar: 'bar' }] 
    const fileName = 'download'
    const exportType = 'csv'
 
    const result = exportFromJSON({
        data,
        fileName,
        exportType,
        processor (content, type, fileName) {
            switch (type) {
                case 'txt':
                    response.setHeader('Content-Type', 'text/plain')
                    break
                case 'json':
                    response.setHeader('Content-Type', 'text/plain')
                    break
                case 'csv':
                    response.setHeader('Content-Type', 'text/csv')
                    break
                case 'xls':
                    response.setHeader('Content-Type', 'application/vnd.ms-excel')
                    break
            }
            response.setHeader('Content-disposition', 'attachment;filename=' + fileName)
            return content
        }
    })
 
    response.write(result)
    response.end()
    */
}

exports.getcontactdata = async (req,res) => {
    console.log('reached')
    try {
        let result = await contact.find( { },
            { name: 1, cnumber: 1, cnic: 1,username : 1,role:1,Group:1,Department:1,_id: 0 })
            //.select('name cnumber username cnic');
        console.log(result);
        res.status(201).json({
            status :'success',
            data : result
        })

    } catch (error) {
        console.log(error)
    }
}

exports.createcontact = async (req,res) => {
    console.log(req.body);
   
    try {
        let thepassword = await bcrypt.hash(req.body.password,12);
        req.body.password = thepassword;
        console.log(req.body);
        let result = await contact.create(req.body);
   
        res.status(201).json({
            status : 'created',
            err : false
        })  
    } catch (error) {
        console.log(error);
        res.status(200).json({
            err : error,
            status : 'error'
        })
    }
   
}