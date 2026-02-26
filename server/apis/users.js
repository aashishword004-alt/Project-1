let exprss = require('express');
let app = exprss();

// Modules
let sequrity = require('../module/password');

// database connection
let connect = require('../database/connection');

// middleware
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Routes 

const ROUTE = '/users'

// GET request
app.get(ROUTE, (req, res) => {
    let sql = "Select id,name,email,(Select count(*) from users) as total from users";
    connect.con.query(sql, (error, result) => {
        if (error) {
            res.json([{ 'Error': 'Error in fetching data' }]);
        }
        else {
            if (result.length === 0) {
                res.json([{ 'Error': true }, { 'Message': 'No User Found' }]);
            }
            else {

                res.json(result);
            }
        }
    })
});

// Post request 
// Ragister API
app.post(ROUTE + '/Ragister', (req, res) => {
    let { name, email, password } = req.body;
    if (name === undefined || email === undefined || password === undefined) {
        res.json([{'Error' : true},{'Message' : 'Input is Missing'}]);
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
        res.json([{ 'Error': 'Input is Missing' }]);

    }
    else {
        let sql = "Select email,password from users where email = ?";
        connect.con.query(sql, [email], (error, result) => {
            if (error) {
                res.json([{ 'Error': 'Error in fetching data' }]);
            }
            else {
                if (result.length == 0) {
                    res.json([{ 'Error': 'Email Not Found' }]);
                }
                else {
                    let hashpassword = result[0]['password'];
                    sequrity.conformpassword(password, hashpassword).then((match) => {
                        if (match == false) {
                            res.json([{ 'Error': 'Login Attempt Failed' }]);
                        }
                        else {
                            res.json([{ 'Success': true }, { 'Message': 'Login Successfully' }]);
                        }
                    })
                }
            }
        })
    }
});

// Change password 
app.put(ROUTE + '/Change_password', (req, res) => {
    let { id, password, newpassword } = req.body;
    if (id === undefined || password === undefined || newpassword === undefined) {
        res.json([{ 'Error': 'Input is Missing' }]);
    }
    else {
        let sql = 'select password from users where id = ?';
        connect.con.query(sql, [id], (error, result) => {
            if (error) {
                res.json([{ 'Error': true }, { 'Message': 'Error in Code' }]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'Error': true }, { 'Message': 'User not Found' }]);
                }
                else {
                    let hashpassword = result[0]['password'];
                    sequrity.conformpassword(password, hashpassword).then((match) => {
                        if (!match) {
                            res.json([{ 'Error': true }, { 'Message': 'Change Password Attempt Failed' }]);
                        }
                        else {
                            sequrity.gethashpassword(newpassword).then((hash) => {
                                let sql = 'update users set password = ? where id = ?'
                                let Value = [hash, id];
                                connect.con.query(sql, Value, (err, output) => {
                                    if (err) {
                                        res.json([{ 'Error': true }, { 'Message': 'Error in Code' }]);
                                    }
                                    else {
                                        res.json([{ 'Success': true }, { 'Message': 'Password Changed Successfully' }, { 'id': output.affectedRows }]);
                                        // console.log(output);
                                    }
                                });
                            });
                        }
                    });
                }

            }
        });
    }
});

//Forgot Password API
app.put(ROUTE + '/Forgot_password' ,(req,res) =>{
  res.json([{'Message' : 'Forgot Password API'}]);
});






let port = 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});