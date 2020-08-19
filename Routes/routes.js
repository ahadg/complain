const express  = require('express');

const router = express.Router();
const ncontacts = require('../controllers/contacts')
const attendence = require('../controllers/attendence');
const login = require('../controllers/login');
const sendsms = require('../controllers/sendsms');
const dak = require('../controllers/dak');
const issue = require('../controllers/issues');

router.get('/createcontact',
//login.protect,
ncontacts.createcontactspage);


// getdata
router.get('/getcontactdata',ncontacts.getcontactdata);



// attendence
router.get('/getattendence',login.protect,attendence.myattendence);
router.get('/attendencerecords',login.protect,attendence.attendencerecord)
router.get('/getweeklydata',login.protect,attendence.getweekly);
router.get('/getmonthlydata',login.protect,attendence.getmonthly);

//login
router.get('/loginme',login.loginme)
router.post('/verifylogin',login.verifylogin);

//sendsms
router.get('/sendsms',login.protect,sendsms.sendpage);
router.post('/sendsmsall',sendsms.sendsms)


//dak
router.get('/dakpage',login.protect,dak.dakpage);
router.post('/createdak',dak.savedak);
router.post('/searchdak',dak.search);

//issue
router.get('/issuepage',login.protect,issue.issuepage)
router.post('/createissue',issue.createissue);
router.get('/allissuepage',login.protect,issue.allissuepage)
router.post('/searchcnic',issue.searchwithcnic);
router.get('/forwardedissues',login.protect,issue.forwadedissue);
router.post('/assignissue',login.protect,issue.assignissue);
router.post('/updatestatus',issue.updatestatus);


router.post('/savecontact',ncontacts.createcontact);

module.exports = router;