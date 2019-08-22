const UserModel = require('../models/user.model');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

async function create(data) {
    const user = new UserModel(data);
    const _userInUse = await UserModel.findOne(_.pick(user, ['email']));
    
    if (_userInUse) {
        return { error: 'User already in use!' };
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
     
    return await _.pick(await user.save(), [ '_id', 'name', 'email']);
}

function read(query) {
    return UserModel.find(query);
}

function update(data) {
    return UserModel.findOneAndUpdate(_.pick(data, [ '_id' ]), data)
}

function destroy(query) {
    return UserModel.deleteOne(_.pick(query, [ '_id' ]))
}

module.exports = {
    create: create,
    read: read,
    update: update,
    destroy: destroy
}