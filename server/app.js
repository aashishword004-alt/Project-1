let express = require('express');
let app = express();

// middlware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');

// frentend and backend connection imp 
app.use(cors(
    origin = "http://localhost:5000",
    methods = ['GET', 'POST', 'PUT', 'DELETE'],
    credentials = true  
));


// Apis Module
let user = require('./apis/users1')
// Routee 

const USER_ROUTE = '/users';

// User APIS


// Ragister API
app.post(USER_ROUTE + '/register' , (req,res) =>{user.Ragistretion(req,res)});

// Login API
app.post(USER_ROUTE + '/login' ,(req,res) =>{user.Login(req,res)});

// chnage Password
app.put(USER_ROUTE + '/changepassword' ,(req,res) =>{user.changepassword(req,res)});

// Forgot Password 
app.put(USER_ROUTE + '/forgotpassword' , (req,res) =>{user.Forgotpassword(req,res)});


// Admin Apis 

const ADMIN = '/admin'
app.post(ADMIN + '/login' ,(req,res) =>{})


const Port = 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});


