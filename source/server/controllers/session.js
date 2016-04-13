
var jwt         = require('jwt-simple');

var rHandlers   = require('../rest-handlers');
var log         = require('../log');

var User        = require('../models/user');

var expiresIn = function (nbDays) {
    var date = new Date();
    return date.setDate(date.getDate() + nbDays);
};

var generateToken = function (user) {
    var expires = expiresIn(2);
    return {
        expires: expires,
        token: jwt.encode({
            exp: expires,
            user: user
        }, require('../config/secret')()),
        uid: user.id // In case the user want to get its data.
    };
};

module.exports = {
    validate: function (username, password, callback) {
        User.findOne({username: username, password: password}, '-password', callback);
    },
    validateUser: function (username, callback) {
        User.findOne({username: username}, callback);
    },
    // POST /session/
    auth: function (req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username === '' || password === '') {
            rHandlers.BadRequest(req, res, 'You must provide a valid username or password');
        } else {
            module.exports.validate(username, password, function (err, user) {
                if (!err && user) {
                    rHandlers.Ok(req, res, generateToken(user));
                } else {
                    rHandlers.BadRequest(req, res, 'Invalid Credentials');
                }
            });
        }
    },
    // DELETE /session/
    destroy: function (req, res) {
    }
};