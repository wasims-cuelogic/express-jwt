import jwt from 'jsonwebtoken';
import config from '../config/config';

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers.token;
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.jwt_secret, function (err, decoded) {
            if (err) { //failed verification. 
                return res.status(401).send({
                    "error": true,
                    "message": "Invalid token"
                });
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).send({
            "error": true,
            "message": "Token required"
        });
    }
}