
// Modules
let sequrity = require('../module/password');
let Mail = require('./mail')

// database connection
let connect = require('../database/connection');



// Routes
// GET request
function Users(req, res) {
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
}

// Post request 
// Ragister API 
function Ragistretion(req, res) {
    console.log(req.body);
    
    if (req.body === undefined) {
        res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Input is Missing' }]);
    }
    else {
        let { name, email, number, password, confirmPassword } = req.body;
        if (name === undefined || email === undefined || number === undefined || password === undefined || confirmPassword === undefined) {
            res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Input is Missing' }]);
        }
        else {
            if (password !== confirmPassword) {
                res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Password  does not match' }]);
                return;
            }
            else {
                let sql = "INSERT INTO users( name, email, number, password) VALUES (?,?,?,?)";
                sequrity.gethashpassword(password).then((hash) => {
                    let Value = [name, email, number, hash];
                    connect.con.query(sql, Value, (error, result) => {
                        if (error) {
                            if (error.errno === 1062) {
                                res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Email Already Exists' }]);
                            }
                            else {
                                console.log("Error in inserting data ", error);
                                res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Error in inserting data' }]);
                            }
                        }
                        else {
                            res.json([{ 'Error': false }, { 'Success': true }, { 'Message': 'User Registered Successfully' }, { "id": result.insertId }]);
                        }

                    });
                });

            }

        }

    }



};

// Login API
function Login(req, res) {
    let { email, password } = req.body;
    if (email === undefined || password === undefined) {
        res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Input is Missing' }]);

    }
    else {
        let sql = "Select email,password from users where email = ?";
        connect.con.query(sql, [email], (error, result) => {
            if (error) {
                res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Error in Code' }]);
            }
            else {
                if (result.length == 0) {
                    res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Email Not Found' }]);
                }
                else {
                    let hashpassword = result[0]['password'];
                    sequrity.conformpassword(password, hashpassword).then((match) => {
                        if (match === false) {
                            res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Login Attempt Failed' }]);
                        }
                        else {
                            res.json([{ 'Error': false }, { 'Success': true }, { 'Message': 'Login Successfully' }]);
                        }
                    })
                }
            }
        })
    }
}

// Change password 
function changepassword(req, res) {
    let { id, password, newpassword } = req.body;
    if (id === undefined || password === undefined || newpassword === undefined) {
        res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Input is Missing' }]);
    }
    else {
        let sql = 'select password from users where id = ?';
        connect.con.query(sql, [id], (error, result) => {
            if (error) {
                res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Error in Code' }]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'User not Found' }]);
                }
                else {
                    let hashpassword = result[0]['password'];
                    sequrity.conformpassword(password, hashpassword).then((match) => {
                        if (!match) {
                            res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Change Password Attempt Failed' }]);
                        }
                        else {
                            sequrity.gethashpassword(newpassword).then((hash) => {
                                let sql = 'update users set password = ? where id = ?'
                                let Value = [hash, id];
                                connect.con.query(sql, Value, (err, output) => {
                                    if (err) {
                                        res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Error in Code' }]);
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
}

//Forgot Password API
function Forgotpassword(req, res) {
    let { email } = req.body;
    if (email === undefined) {
        res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Input is Missing' }]);
    }
    else {
        let sql = 'select  id from users where email = ?';
        connect.con.query(sql, [email], (error, result) => {
            if (error) {
                res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Error in Code' }]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'User Not Found' }]);
                }
                else {
                    let random = sequrity.GenOtp(6);
                    console.log(random);
                    sequrity.gethashpassword(random).then((hash) => {
                        let sql = 'update users set password = ? where email = ?';
                        let Value = [hash, email];
                        connect.con.query(sql, Value, (err, output) => {
                            if (err) {
                                res.json([{ 'Error': true }, { 'Success': false }, { 'Message': 'Error in Code' }]);
                            }
                            else {
                                let sub = 'Password Reset OTP';
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
}

 const  adminlogin = (req,res) => {
      
    let {email,password} = req.body;
    if(email === undefined || password === undefined)
    {
        res.json([{'error' : true},
            {
                'success' : false
            },
            {
                'message' : 'Input is Missing'
            }
        ]);
    }
    else{
        let sql = 'select email,password,role from users where email = ?';
        connect.con.query(sql,[email,password] ,(error,result) =>{
            if(error)
            {
                res.json([{'error' : true},
                    {
                        'success' : false
                    }
                    ,{
                        'message' : 'error in Code'
                    }
                ]);
            }
            else{
                if(result.length === 0)
                {
                    res.json([{'error' : true},
                        {
                            'success' : false
                        },
                        {
                            'message' : 'user not found'
                        }
                    ]);
                }
                else{
                    let hashpassword = result[0]['password'];
                    let role = result[0]['role'];
                    if(role !== 'admin')
                    {
                        res.json([{'error' : true},
                            {
                                'success' : false
                            },
                            {
                                'message' : 'Access Denied'
                            }
                        ]);
                    }
                    else{
                        sequrity.conformpassword(password,hashpassword)
                        .then((match) =>{
                            if(!match)
                            {
                                res.json([{'error' : true},
                                    {
                                        'success' : false
                                    },
                                    {
                                        'message' : 'Invalid Credentials'
                                    }
                                ]);
                            }
                            else {
                                res.json([{'error' : false},
                                    {
                                        'success' : true
                                    },
                                    {
                                        'message' : 'login successfully'
                                    }
                                ]);
                            }
                        })
                    }
                }
            }
        });
    }
}

module.exports.Ragistretion = Ragistretion;
module.exports.Login = Login;
module.exports.changepassword = changepassword;
module.exports.Forgotpassword = Forgotpassword;
module.exports.adminlogin = adminlogin;

