const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
                  
    if (!token) {
        return res.status(401).send('Access Denied!')
    }

    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        return next();
    } catch(error) {
        return res.status(401).send('Access Denied!')
    }
}
