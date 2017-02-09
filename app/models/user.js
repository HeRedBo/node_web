var moogoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = moogoose.model('User',UserSchema);

module.exports = User;
