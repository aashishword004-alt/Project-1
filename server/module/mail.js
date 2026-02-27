let nodemailer = require('nodemailer');
let opt = require('./password');


let trf = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aashishword004@gmail.com',
        pass: 'imat knrx khmy eftw'

    }
});

const sendMail = (to,sub,text) => {
    return trf.sendMail({
        from: "aashishword004@gmail.com",
        to,
        subject: sub,
        text: text
    })
        .then(info => {
            console.log("Mail Sent:", info);
            return true;
        })
        .catch(error => {
            console.error("Mail Error:", error);
            return false;
        });
};
// sendMail('aashishparmar0707@gmail.com',text);


module.exports =  sendMail  