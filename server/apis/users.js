let exprss = require('express');
let app = exprss();

// Modules
let security = require('../module/password');
let Mail = require('./mail')


// database connection
let connect = require('../database/connection');

// middleware
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Routes 

const ROUTE = '/users'

const ADMIN = '/admin'

// GET request
app.get(ROUTE, (req, res) => {
    let sql = "Select id,name,email,(Select count(*) from users) as total from users";
    connect.con.query(sql, (error, result) => {
        if (error) {
            res.json([{ 'Error': true }, { 'Message': 'Error in Code' }]);
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
app.post(ROUTE + '/register', (req, res) => {
    let { name, email, password } = req.body;
    if (name === undefined || email === undefined || password === undefined) {
        res.json([{ 'Error': true }, { 'Message': 'Input is Missing' }]);
    }
    else {
        let sql = "INSERT INTO users( name, email, password) VALUES (?,?,?)";
        security.gethashpassword(password).then((hash) => {
            let Value = [name, email, hash];
            connect.con.query(sql, Value, (error, result) => {
                if (error) {
                    if (error.errno === 1062) {
                        res.json([{ 'Error': true }, { 'Message': 'Email Already Exists' }]);
                    }
                    else {
                        console.log("Error in inserting data ", error);
                        res.json([{ 'Error': true }, { 'Message': 'Error in inserting data' }]);
                    }
                }
                else {
                    res.json([{ 'Error': false }, { 'Success': true }, { 'Message': 'User Registered Successfully' }, { "id": result.insertId }]);
                }

            });
        });

    }

});

// Login API
app.post(ROUTE + '/login', (req, res) => {
    let { email, password } = req.body;
    if (email === undefined || password === undefined || role === undefined) {
        res.json([{ 'Error': true }, { 'Message': 'Input is Missing' }]);

    }
    else {
        let sql = "Select email,password from users where email = ?";
        connect.con.query(sql, [email], (error, result) => {
            if (error) {
                res.json([{ 'Error': true }, { 'Message': 'Error in Code' }]);
            }
            else {
                if (result.length == 0) {
                    res.json([{ 'Error': true }, { 'Message': 'Email Not Found' }]);
                }
                else {
                    let hashpassword = result[0]['password'];
                    security.conformpassword(password, hashpassword).then((match) => {
                        if (match === false) {
                            res.json([{ 'Error': true }, { 'Message': 'Login Attempt Failed' }]);
                        }
                        else {
                            res.json([{ 'Error': false }, { 'Success': true }, { 'Message': 'Login Successfully' }]);
                        }
                    })
                }
            }
        })
    }
});

// Change password 
app.put(ROUTE + '/change_password', (req, res) => {
    let { id, password, newpassword } = req.body;
    if (id === undefined || password === undefined || newpassword === undefined) {
        res.json([{ 'Error': true }, { 'Message': 'Input is Missing' }]);
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
                    security.conformpassword(password, hashpassword).then((match) => {
                        if (!match) {
                            res.json([{ 'Error': true }, { 'Message': 'Change Password Attempt Failed' }]);
                        }
                        else {
                            security.gethashpassword(newpassword).then((hash) => {
                                let sql = 'update users set password = ? where id = ?'
                                let Value = [hash, id];
                                connect.con.query(sql, Value, (err, output) => {
                                    if (err) {
                                        res.json([{ 'Error': true }, { 'Message': 'Error in Code' }]);
                                    }
                                    else {
                                        res.json([{ 'Error': false }, { 'Success': true }, { 'Message': 'Password Changed Successfully' }, { 'id': output.affectedRows }]);
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
app.put(ROUTE + '/forgot_password', (req, res) => {
    let { email } = req.body;
    if (email === undefined) {
        res.json([{ 'Error': true }, { 'Message': 'Input is Missing' }]);
    }
    else {
        let sql = 'select  id from users where email = ?';
        connect.con.query(sql, [email], (error, result) => {
            if (error) {
                res.json([{ 'Error': true }, { 'Message': 'Error in Code' }]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'Error': true }, { 'Message': 'User Not Found' }]);
                }
                else {
                    let random = security.GenOtp(6);
                    console.log(random);
                    security.gethashpassword(random).then((hash) => {
                        let sql = 'update users set password = ? where email = ?';
                        let Value = [hash, email];
                        connect.con.query(sql, Value, (err, output) => {
                            if (err) {
                                res.json([{ 'Error': true }, { 'Message': 'Error in Code' }]);
                            }
                            else {
                                let sub = 'New  Password';
                                let text = `Your password  is ${random}`;
                                Mail.sendMail(email, sub, text)
                                res.json([{ 'Error': false }, { 'Success': true }, { 'Message': 'Password are sent in your ' + email }]);
                            }
                        })
                    })
                }
            }
        })

    }
});


app.post(ADMIN + '/login', (req, res) => {

    let { email, password } = req.body;
    if (email === undefined || password === undefined) {
        res.json([{ 'error': true },
        {
            'success': false
        },
        {
            'message': 'Input is Missing'
        }
        ]);
    }
    else {
        let sql = 'select email,password,role from users where email = ?';
        connect.con.query(sql, [email, password], (error, result) => {
            if (error) {
                res.json([{ 'error': true },
                {
                    'success': false
                }
                    , {
                    'message': 'error in Code'
                }
                ]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'error': true },
                    {
                        'success': false
                    },
                    {
                        'message': 'user not found'
                    }
                    ]);
                }
                else {
                    let hashpassword = result[0]['password'];
                    let role = result[0]['role'];
                    if (role !== 'admin') {
                        res.json([{ 'error': true },
                        {
                            'success': false
                        },
                        {
                            'message': 'Access Denied'
                        }
                        ]);
                    }
                    else {
                        security.conformpassword(password, hashpassword)
                            .then((match) => {
                                if (!match) {
                                    res.json([{ 'error': true },
                                    {
                                        'success': false
                                    },
                                    {
                                        'message': 'Invalid Credentials'
                                    }
                                    ]);
                                }
                                else {
                                    res.json([{ 'error': false },
                                    {
                                        'success': true
                                    },
                                    {
                                        'message': 'login successfully'
                                    }
                                    ]);
                                }
                            })
                    }
                }
            }
        });
    }
});

app.put(ADMIN + '/chnage_password', (req, res) => {
    let { id, password, newpassword } = req.body;
    if (!id || !password || !newpassword) {
        res.json([{ 'error': true },
        {
            'success': false
        },
        {
            'message': 'input is missing'
        }
        ]);
    }
    else {
        let sql = 'select password from users wher id = ?'
        connect.con.query(sql, [id], (error, result) => {
            if (error) {
                res.json([{ 'error': true },
                {
                    'success': false
                },
                {
                    'message': 'somthing wrong in server'
                }
                ]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'error': true },
                    {
                        'success': false
                    },
                    {
                        'message': 'user not found '
                    }
                    ]);
                }
                else {
                    let hashpassword = result[0].['password'];
                    security.conformpassword(password, hashpassword).
                        then((match) => {
                            if (!match) {
                                res.json([{
                                    'error': true
                                },
                                {
                                    'success': false
                                },
                                {
                                   'message' : 'change password attempt faild'
                                }]);
                            }
                            else{
                                 security.gethashpassword(newpassword).
                                 then((hash) =>{
                                        let sql = 'update users set password = ? where id = ?';
                                        let value = [hash,id]
                                        connect.con.quer( sql, value ,(err,output) =>{
                                             if(err)
                                             {
                                                res.json([{'error' : true},
                                                    {
                                                        'success' :  false
                                                    },
                                                    {
                                                        'message' : 'somthing wormg in system'
                                                    },
                                                    {
                                                        'message' : 'somthing wormg in system'
                                                    }
                                                ]);
                                             }
                                             else{
                                                res.json([{'error' : false},
                                                    {
                                                        'success' : true
                                                    },
                                                    {
                                                        'message' : 'password change successfully '
                                                    }
                                                ]);
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







let port = 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});