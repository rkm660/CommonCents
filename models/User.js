var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userID: { type: String, unique: true, index: true },
  name: String
});

module.exports = mongoose.model('User', UserSchema);