
var jwt         = require('jwt-simple');

var rHandlers   = require('../rest-handlers');
var log         = require('../log');

var expiresIn = function (nbDays) {
    var date = new Date();
    return date.setDate(date.getDate() + nbDays);
};

var generateToken = function (dbUser) {
    var expires = expiresIn(2);
    return {
        expires: expires,
        token: jwt.encode({
            exp: expires,
            user: dbUser
        }, require('../config/secret')()),
        uid: dbUser.id // In case the user want to get its data.
    };
};

module.exports = {
    validate: function (username, password) {
        // Check mongoose
        return {'username' : 'test', 'password' : 'test', id : 3}
    },
    validateUser: function (username) {
        // Check username mongoose
        return {'username' : 'test', 'password' : 'test', id : 3}
    },
    // POST /session/
    auth: function (req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username === '' || password === '') {
            rHandlers.BadRequest(req, res, 'You must provide a valid username or password');
        } else {
            var dbUser = module.exports.validate(username, password)
            if (!dbUser) {
                rHandlers.BadRequest(req, res, 'Invalid Credentials');
            } else {
                rHandlers.Ok(req, res, generateToken(dbUser));
            }
        }
    },
    // DELETE /session/
    destroy: function (req, res) {
    }
};