
// Dependencies

var mongoose = require('mongoose'); // ORM
var log      = require('../log')

var UserSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    email    : {type: String, required: true, unique: true},
    // To complete according to foodie.
    role     : String // customer / owner / admin ??
});

var User = mongoose.model('User', UserSchema);

// Seed some default users.
// -- Since username is unique, should seed only if they are not present.
// -- Admin account should stay after production launch.
User({
    username: 'admin',
    password: 'adminpwd',
    email   : 'admin@foodie.com',
    role    : 'admin'
}).save(function (err, obj) {
    if (!err) log('UserModel', 'Default user `' + obj.username + '` created.');
});

// -- Should be deleted for production launch, account used only while developing the app.
User({
    username: 'test',
    password: 'testpwd',
    email   : 'test@foodie.com',
    role    : 'user'
}).save(function (err, obj) {
    if (!err) log('UserModel', 'Default user `' + obj.username + '` created.');
});

module.exports = User;