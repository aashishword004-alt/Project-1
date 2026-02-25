let seq = require('./server/module/password');

let password = "12345678";

seq.gethashpassword(password).then((hash) => {
    console.log("Hash Password ", hash);
    seq.conformpassword(password,hash).then((result) => {
        console.log("Password Match ", result);
    });     
}); 


