const router = require('express').Router();
const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');


router.get('/GetUsers', (req, res) => {
    res.send([{userId: '_fndjsvgsd139fhb32g2v29'}]);
});

router.get('/AddUser', (req, res) => {
    const saveObj = {
        name: 'Onurhan',
        email: 'onurhan@gmail.com',
        password: 'Onurhan123@'
    }
    
    UserService.addUser(saveObj, (err, _res) => {
        if (err) {
            return console.log(err);
        }
        res.status(500).send({ success: true, saveObj });
    });

});

module.exports = router;