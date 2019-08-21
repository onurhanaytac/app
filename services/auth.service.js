const UserModel = require('../models/user.model');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(query) {
    const user = await UserModel.findOne(_.pick(query, [ 'email' ]));

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(query.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }


    const token = jwt.sign(_.pick(user, [ '_id', 'name', 'email' ]), process.env.TOKEN_SECRET)

    return { token: token, user: user };
}


module.exports = {
    login: login,
}