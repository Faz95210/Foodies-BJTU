
// Dependencies

var mongoose = require('mongoose'); // ORM
var log      = require('../log')

var UserSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    email    : {type: String, required: true, unique: true},
    // To complete according to foodie.
    role     : {type: String, enum: 'customer owner'.split(' ')},
    isAdmin  : Boolean
});

var User = mongoose.model('User', UserSchema);

// Seed some default users.
// -- Since username is unique, should seed only if they are not present.
// -- Admin account should stay after production launch.
User({
    username: 'admin',
    password: 'adminpwd',
    email   : 'admin@foodie.com',
    role    : 'customer',
    isAdmin : true
}).save(function (err, user) {
    if (!err && user) log('UserModel', 'Default user `' + user.username + '` created.');
});

// -- Should be deleted for production launch, account used only while developing the app.
User({
    username: 'customer',
    password: 'customerpwd',
    email   : 'customer@foodie.com',
    role    : 'customer',
    isAdmin : false
}).save(function (err, user) {
    if (!err && user) log('UserModel', 'Default user `' + user.username + '` created.');
});

User({
    username: 'owner',
    password: 'ownerpwd',
    email   : 'owner@foodie.com',
    role    : 'owner',
    isAdmin : false
}).save(function (err, user) {
    if (!err && user) log('UserModel', 'Default user `' + user.username + '` created.');
});

module.exports = User;