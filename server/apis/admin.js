let express = require('express');
let app = express();

//middleware;
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.unrealconde({extends:true}));

// databse 
let connect = require('../database/connection');

// Routes 
const ADMIN = '/admin';

app.post(ADMIN  + '/Ragister', (req, res) => {
    let { name, email, password ,role } = req.body;
    if (name === undefined || email === undefined || password === undefined|| role === undefined ) {
        res.json([{ 'Error': true }, { 'Message': 'Input is Missing' }]);
    }
    else {
        let sql = "INSERT INTO users( name, email, password,role) VALUES (?,?,?,?)";
        sequrity.gethashpassword(password).then((hash) => {
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



let port = 3000;
app.listen( port,() =>{
    console.log('Serever are Listen on' + po);

})

