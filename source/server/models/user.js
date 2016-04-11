
// Dependencies

var mongoose = require('mongoose'); // ORM

var UserSchema = new mongoose.Schema({
    'username' : {type: String, required: true, unique: true},
    'password' : {type: String, required: true},
    'email'    : {type: String, required: true, unique: true},
    // To complete according to foodie.
    'role'     : String // customer / owner / admin ??
});

module.exports = mongoose.model('User', UserSchema);