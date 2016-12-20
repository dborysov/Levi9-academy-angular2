const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: { type: String, unique: true, index: true, validate: [/^.+@.+\..+$/, 'please, enter a valid email'] },
    hashedPassword: { type: String }
});

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.set('hashedPassword', bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
    });

UserSchema.path('hashedPassword').validate(function () {
    if (this.isNew && !this._password) {
        this.invalidate('password', 'required');
    }

    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'must be at least 6 characters');
    }
})

UserSchema.method('authenticate', function (password) {
    return bcrypt.compareSync(password, this.hashedPassword);
});

module.exports = mongoose.model('User', UserSchema);
