let express = require('express');
let app = express();

// middlware 
let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :  true}));


// Routee 

const USER_ROUTE = '/users';

// User APIS
app.get(USER_ROUTE, (req,res) =>{
    res.json([{'Message' : 'Users API'}]);

});

// Ragister API
app.post(USER_ROUTE + '/Ragister');


// Login API
app.post(USER_ROUTE + '/Login' , );



const Port = 5000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});


