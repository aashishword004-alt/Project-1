const argon2 = require("argon2");

let security = {

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
                return true;
            }
            else {
                return false;
            }

        }
        catch (err) {
            console.error("Hashing Faild", err);
        }

    }


}
module.exports = security;


