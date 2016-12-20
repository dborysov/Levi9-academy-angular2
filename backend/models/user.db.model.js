const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: { type: String, unique: true, index: true },
    hashedPassword: { type: String }
});

UserSchema.virtual('password')
    .set(function (password) {
        this.set('hashedPassword', bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
    });

UserSchema.method('authenticate', function (password) {
    return bcrypt.compareSync(password, this.hashedPassword);
});

module.exports = mongoose.model('User', UserSchema);
