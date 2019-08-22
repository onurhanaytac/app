const router = require('express').Router();
var cookieParser = require('cookie-parser');
const user = require('./user.route');
const auth = require('./auth.route');

router.use(cookieParser());
router.use('/User', user);
router.use('/Auth', auth);
router.use(function (req, res, next) {
 
    // let my cookie be (or not be) here
    let mc = req.cookies._mc;
 
    // if not make it
    if (!mc) {
 
        // crude id gen for now
        let id = new Date().getTime().toString();
        res.cookie('_mc', id);
        req.cookies._mc = id;
 
    }
 
    next();
 
});

module.exports = router;