const argon2 = require("argon2");
let crypto = require('crypto');


let sequrity = {
    // hashpassword
    gethashpassword: async (password) => {

        try {

            const hash = await argon2.hash(password);
            return hash;

        }
        catch (err) {
            console.error("Hashing Faild ", err);

        }

    },


    conformpassword: async (password, hashpaaword) => {

        try {
            if (await argon2.verify(hashpaaword, password)) {
                // console.log("Password Match");
                return true;
            }
            else {
                // console.log("Password Not Match");
                return false;
            }

        }
        catch (err) {
            console.error("Hashing Faild", err);
        }

    },

    GenOtp : (length = 6) =>{
        let otp = "";
        for(let i = 0; i < length; i++)
        {
            otp += crypto.randomInt(0,10);
        }
        return otp;

    }    

}

module.exports = sequrity;


