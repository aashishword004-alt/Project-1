let express = require('express');
let app = express();
require("dotenv").config();


//middleware;
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extends: true }));
let jwt = require('jsonwebtoken');

// modules 
let sequrity = require('../module/password')
let Mail = require('./mail')

// databse 
let connect = require('../database/connection');

// Routes 
const COMPANY = '/Company';
// recruiter register


// recuiter Login
app.post(COMPANY + '/Login', (req, res) => {

    let { email, password } = req.body;
    if (!email || !password) {
        req.json([{ 'Error': true }, { 'MEssage': 'Input is Missing' }]);
    }
    else {
        let sql = 'select email , password from users where email = ?';
        let Value = [email, password]
        connect.con.query(sql, Value, (Error, result) => {
            if (Error) {
                res.json([{ 'Error': true }, { 'Message': 'Somthing Wromg in Code' }]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'Error': true }, { 'Message': 'Login Attempt Faild' }]);
                }
                let hashpasswor = result[0].password;
                sequrity.conformpassword(password, hashpasswor).then((macth) => {
                    if (!macth) {
                        res.json([{ 'Error': true }, { 'Message': 'Login  Faild' }]);
                    }
                    else {
                        res.json([{ 'Error': false }, { 'Message': 'Login Successfully' }]);

                    }
                });
            }
        });
    }

});

// Admin ChangePassword 
app.put(COMPANY + '/Change_Password', (req, res) => {
    let { id, password, newpassword } = req.body;
    if (!id || !password || !newpassword) {
        res.json([{ 'Error': true }, { 'Message': 'Input is Missing' }]);
    }
    else {
        let sql = 'select password from users where id = ?';
        connect.con.query(sql, [id], (Error, result) => {
            if (Error) {
                res.json([{ 'Error': true }, { 'Message': 'Somthing Wromg in Code' }]);
            }
            else {
                if (result.length === 0) {
                    res.json([{ 'Error': true }, { 'Message': 'User Not Found' }]);
                }
                else {
                    let hashpassword = result[0].password;
                    sequrity.conformpassword(password, hashpassword).then((match) => {
                        if (!match) {
                            res.json([{ 'Error': true }, { 'Message': 'Change Password Attempt Faild' }]);
                        }
                        else {
                            sequrity.gethashpassword(newpassword).then((hash) => {
                                let sql = 'update users set password = ? where id = ?';
                                let value = [hash, id];
                                connect.con.query(sql, value, (Error, result) => {
                                    if (Error) {
                                        res.json([{ 'Error': true }, { 'Message': 'Somthing Wromg in Code' }]);
                                    }
                                    else {
                                        res.json([{ 'Error': false }, { 'Success': true }, { 'Message': 'Password Change Successfully' }, { 'AffectedRows': result.affectedRows }]);
                                    }
                                });
                            })
                        }
                    })
                }
            }
        })
    }
})

// Admin Forgoot Password 
app.put(COMPANY + '/Forgot_Password', (req, res) => {
    let { email } = req.body;
    if(!email)
    {
        res.json([{'Error' : true},{'Message' : 'Input is Missing'}])
    }
    else {
        let sql = 'select id from users where email = ?'
        connect.con.query(sql , [email] , (error,result) =>{
            if(error)
            {
                res.json([{'Error' : true} ,{'Message' : 'Somthing Wrong in code'}]);
            }
            else{
                if(result.length === 0)
                {
                    res.json([{'Error' : true} ,{'Message' : 'Forgot Password Attempy faild'}])
                }
                 else {
                    let random = seqirity.GenOtp(6)
                    sequrity.gethashpassword(random).then((hash) =>{
                        let sql = 'update users set password = ? where email = ?';
                        let value  = [hash,email];
                        connect.con.query(sql,value,(error,result ) =>{
                            if(error)
                            {
                                res.json([{'Error' : true} ,{'Message' : 'Somthing Wrong in Code'}])
                            }
                            else
                            { 
                                let sub = 'New  Password';
                                let text = `Your password  is ${random}`;
                                Mail.sendMail(email,sub,text)
                                res.json([{'Error' : false},{'Message' : 'Password are sent in your ' + email}]);
                            }
                        })
                    })
                 }

            }
        })

    }

});



let port = 3000;
app.listen(port, () => {
    console.log('Serever are Listen on' + port);

})

