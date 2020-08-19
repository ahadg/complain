const express = require('express');

const myapp = express();
myapp.use(express.json())
const path = require('path');
const expresslayout = require('express-ejs-layouts');
const cors = require('cors');
const cookieparser = require('cookie-parser');

require('./server')
myapp.use(cookieparser())
myapp.use(cors({
    origin : 'http://localhost:5000',
    credentials : true,
    
  }));

myapp.use(expresslayout);
myapp.use(express.static(path.join(__dirname,'public')));
myapp.set('view engine','ejs');

myapp.use('/',require('./Routes/routes'))

myapp.listen(5000, () => {
    console.log('app is running on 5000');
})