
const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const tokenValue = token.replace('Bearer ', '');

        const user = jwt.verify(tokenValue, config.secretKey);
        req.user = user;
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
    next();
};
