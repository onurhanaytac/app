const router = require('express').Router();
const user = require('./user.route');

router.use('/User', user);

module.exports = router;