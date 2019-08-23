const router = require('express').Router();
const user = require('./user.route');
const authorization = require('./auth.route');
const authentication = require('../middlewares/auth');

router.use('/User', authentication, user);
router.use('/Auth', authorization);

module.exports = router;