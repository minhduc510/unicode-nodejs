const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/environment')

module.exports = function (io) {
    return io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('No token provided'));
        }
        jwt.verify(token, jwt_secret, (err, user) => {
            if (err) {
                return next(new Error('Invalid token'));
            }
            socket.user = user;
            next();
        });
    });
}