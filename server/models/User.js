var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userID: { type: String, unique: true, index: true },
    token: String,
    email: String,
    first_name: String,
    last_name: String,
    location: String,
    hometown: String
});

module.exports = mongoose.model('User', UserSchema);
