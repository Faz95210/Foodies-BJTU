
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
        User.findOne({username: username, password: password}, '-password -__v', callback);
    },
    validateUser: function (username, callback) {
        User.findOne({username: username}, callback);
    },
    // POST /session/
    auth: function (req, res) {
        req.checkBody('username', 'Field username is required').notEmpty();
        req.checkBody('password', 'Field password is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            rHandlers.BadRequest(req, res, errors);
        } else {
            module.exports.validate(req.body.username, req.body.password, function (err, user) {
                if (!err && user) {
                    rHandlers.Ok(req, res, generateToken(user));
                } else {
                    rHandlers.BadRequest(req, res, 'Invalid Credentials');
                }
            });
        }
    }
};