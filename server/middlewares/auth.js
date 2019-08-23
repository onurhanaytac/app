const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const auth = req.header('Authorization');
    const bearer = auth ? auth.split(' ')[1] : null;
    
    if (!bearer) {
        return res.status(401).send('Access Denied!')
    }

    try {
        req.user = jwt.verify(bearer, process.env.TOKEN_SECRET);
        return next();
    } catch(error) {
        return res.status(401).send('Access Denied!')
    }
}
