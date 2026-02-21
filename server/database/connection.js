let adp = require('./adpter');
let mysql = require('mysql');

let con = mysql.createConnection({
      host:adp.server,
      user:adp.username,
      password: adp.password,
      database:adp.database,
      port:adp.portno,

       
});

con.connect((error) =>{
    if(error){
        console.log('Error in connection');
    }
    else {
        console.log('Connected to database');
    }
});

module.exports.con = con