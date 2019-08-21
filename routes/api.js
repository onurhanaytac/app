const router = require('express').Router();
const user = require('./user.route');
const auth = require('./auth.route');

router.use('/User', user);
router.use('/Auth', auth);

module.exports = router;