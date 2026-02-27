let express = require('express');
let app = express();

// middlware 
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :  true}));

// Apis Module
let user = require('./apis/users1')
// Routee 

const USER_ROUTE = '/users';

// User APIS

// Ragister API
app.post(USER_ROUTE + '/Ragister' , (req,res) =>{user.Ragistretion(req,res)});


// Login API
app.post(USER_ROUTE + '/Login' ,(req,res) =>{user.Login(req,res)});

// chnage Password
app.put(USER_ROUTE + '/Changepassword' ,(req,res) =>{user.changepassword(req,res)});

// Forgot Password 
app.put(USER_ROUTE + '/Forgotpassword' , (req,res) =>{user.Forgotpassword(req,res)});


const Port = 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});


