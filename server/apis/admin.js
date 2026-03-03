let express = require('express');
let app = express();


//middleware;
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extends: true }));

// modules 
let sequrity = require('../module/password')

// databse 
let connect = require('../database/connection');

// Routes 
const ADMIN = '/Company';
// recruiter register

app.post(ADMIN + '/Register', (req, res) => {
    let { name, email, password, role } = req.body;
    if (name === undefined || email === undefined || password === undefined || role === undefined) {

        res.json([{ 'Error': true }, { 'Message': 'Input is Missing' }]);
    }
    else {

        if (role === 'admin') {
            res.json([{ 'Error': true }, { 'Message': 'Cannot register as admin' }])
        }
        else {
            let status = 'approved'
            if (role === 'recruiter')
                status = 'panding'
            let sql = "INSERT INTO users( name, email, password,role) VALUES (?,?,?,?)";
            sequrity.gethashpassword(password).then((hash) => {
                let Value = [name, email, hash, role];
                connect.con.query(sql, Value, (error, result) => {
                    if (error) {
                        if (error.errno === 1062) {
                            res.json([{ 'Error': true }, { 'Message': 'Invalid Email Address' }]);
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


    }

});

// recuiter Login
app.post(ADMIN + '/Login', (req, res) => {

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
                    res.json([{ 'Error': true }, { 'Message': 'Invalid Recuiter' }]);
                }
                let hashpasswor = result[0].password;
                sequrity.conformpassword (password,hashpasswor).then((macth) => {
                    if (!macth) {
                        res.json([{ 'Error': true }, { 'Message': 'Login Attempt Faild' }]);
                    }
                    else {
                        res.json([{ 'Error': false }, { 'Message': 'Login Successfully' }]);

                    }
                });
            }
        });
    }

});





let port = 3000;
app.listen(port, () => {
    console.log('Serever are Listen on' + port);

})

