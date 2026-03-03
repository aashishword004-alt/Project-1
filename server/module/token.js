const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.json({ error: true, message: "Token required" });
    }

    const token = authHeader.split(" ")[1];  // Bearer TOKEN

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.json({ error: true, message: "Invalid or Expired Token" });
        }

        // token is valid
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;