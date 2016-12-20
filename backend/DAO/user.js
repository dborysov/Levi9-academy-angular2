const User = require('../models/user.db.model');
const jwt = require('jsonwebtoken');

const serverConfig = require('../server.config');

module.exports = {
    register,
    login
};

function register(email, password) {
    return email && password
        ? Promise.resolve(User.create({ email, password }))
        : Promise.reject('Email and password required')
}

function login(email, password) {
    return Promise.resolve(User.findOne({ email }))
        .then(user => {
            if (!user) {
                throw new Error('No user with such email');
            }
            if (!user.authenticate(password)) {
                throw new Error('Email or password is incorrect');
            }

            return jwt.sign({ email }, serverConfig.jwtToken);
        })
}
