const router = require('express').Router();
const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');

const _ = require('lodash')

router.post('/register', (req, res) => {
    const user = UserService.create(req.body);

    user.then(_user => {
        res.status(200).send({ success: true, _user });
    }).catch(error => {
        return res.status(400).send({ success: false, error: error.message });
    });
});

router.post('/login', (req, res) => {
    const login = AuthService.login(_.pick(req.body, [ 'email', 'password' ]));

    login.then(login => {
        res.cookie('auth-token', login.token);
        res.status(200).send({ success: true, user: _.pick(login.user, [ '_id', 'email', 'name' ]) });
    }).catch(error => {
        return res.status(400).send({ success: false, error: error.message });
    });
});

module.exports = router;