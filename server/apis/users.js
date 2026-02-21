let exprss = require('express');
let app = exprss();

// Modules
let sequrity = require('../module/password');

// database connection
let connect = require('../database/connection');

// middleware
let bodyparser = require('body-parser');
const { hash } = require('argon2');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Routes 

const ROUTE = '/users'

// GET request
app.get(ROUTE, (req, res) => {
    res.json('Users API');
});

// Post request 

// Ragister API
app.post(ROUTE + '/Ragister', (req, res) => {
    let { name, email, password } = req.body;
    if (name === undefined || email === undefined || password === undefined) {
        res.json('Input is Missing');
    }
    else {
        let sql = "INSERT INTO users( name, email, password) VALUES (?,?,?)";
        sequrity.gethashpassword(password).then((hash) => {
            let Value = [name, email, hash];
            connect.con.query(sql, Value, (error, result) => {
                if (error) {
                    if (error.errno === 1062) {
                        res.json([{ 'Error': 'Email Already Exists' }]);
                    }
                    else {
                        console.log("Error in inserting data ", error);
                        res.json([{ 'Error': 'Error in inserting data' }]);
                    }
                }
                else {
                    res.json([{ 'Success': 'User Registered Successfully' }, { "id": result.insertId }]);
                }

            });
        });

    }

});

// Login API
app.post(ROUTE + '/Login', (req, res) => {
    let { email, password } = req.body;
    if (email === undefined || password === undefined) {

        res.json([{ "Error": "Input is Missing" }]);
    }
    else{
        let sql = "SELECT id, email, password FROM users WHERE email = ?";
        connect.con.query(sql , [email] ,(error ,result) =>{
            if(error) {
                console.log("Error in fetching data ", error);
                res.json([{ "Error": "Error in fetching data" }]);
            }
            else{
                   if(result.length === 0)
                {
                    res.json([{ "Error": " Attempt Failed" }]);
                }
                else {
                    let hashpassword = result[0]['password'];
                    sequrity.conformpassword(password,hashpassword).then((macth) =>{
                        if(!macth)
                        {
                            res.json([{ "Error": "Login Attempt Failed" }]);
                        }
                        else{
                            res.json([{"Success:" : "Login Successfully"} ,{"id" : result[0].id}]);
                        }
                    });
                }
            }
        });



    }
});






let port = 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});