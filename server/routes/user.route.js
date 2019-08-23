const router = require('express').Router();
const UserService = require('../services/user.service');

router.post('/create', (req, res) => {
    const user = UserService.create(req.body);

    user.then(_user => {
        res.status(200).send({ success: true, _user });
    }).catch(error => {
        return res.status(400).send({ success: false, error: error.message });
    });
});

router.get('/read', (req, res) => {
    const users = UserService.read(req.query);

    users.then(_users => {
        res.status(200).send({ success: true, _users });
    }).catch(error => {
        return res.status(400).send({ success: false, error: error.message });
    });
});

router.post('/update', (req, res) => {
    const user = UserService.update(req.body);
    
    user.then(_user => {
        res.status(200).send({ success: true, _user });
    }).catch(error => {
        return res.status(400).send({ success: false, error: error.message });
    });
});

router.post('/destroy', (req, res) => {
    const user = UserService.destroy(req.body);
    
    user.then(_user => {
        res.status(200).send({ success: true, _user });
    }).catch(error => {
        return res.status(400).send({ success: false, error: error.message });
    });
});

module.exports = router;