let exprss = require('express');
let app = exprss();

// database connection
let con = require('../database/connection');

// middleware
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

// Routes 

const ROUTE = '/users'

// GET request
app.get(ROUTE ,  (req,res) =>{
    res.send('Users API');
});

// Post request 

// Ragister API
app.post(ROUTE + '/Ragister', (req,res) =>{
 res.send('Ragister API');
});

// Login API
app.post(ROUTE + '/Login', (req,res) =>{
 res.send('Login API');
});






let port = 3000;
app.listen(port ,() =>{
    console.log('Server is running on port ' + port);
});