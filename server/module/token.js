const jwt = require('jsonwebtoken');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const user = {
    id: 1,
    email: "ashish@gmail.com",
    role: "admin"
};

const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });

console.log(token);