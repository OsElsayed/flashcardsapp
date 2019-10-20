const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('#!myTotalySecretKey!#');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    cards: [{
        cardname: String,
        front: String,
        back: String,
        type: String,
        priority: Number,
        hints: [{
            hint: String
        }]
    }],
}
,
{ typeKey: '$type' });


userSchema.query.findUserByEmail = function (email) {
    return this.findOne({ email: email });
};
userSchema.query.findUserByEmailAndPassword = async function (email, password) {
    let user = await this.findOne({ email: email });
    if (user) {
        if (cryptr.decrypt(user.password) === password) {
            return user;
        }
    }

    return null;
};
module.exports = mongoose.model('User', userSchema);