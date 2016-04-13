
var jwt             = require('jwt-simple');
var rHandlers       = require('./rest-handlers');

var validateUser    = require('./controllers/session').validateUser;

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (token) {
            try {
                var decoded = jwt.decode(token, require('./config/secret')());

                if (decoded.exp <= Date.now()) {
                    rHandlers.BadRequest(req, res, 'Your token is expired');
                } else {
                    validateUser(decoded.user.username, function (err, user) {
                        if (!err && user) {
                            req.session = {user: user};
                            next();
                        } else {
                            rHandlers.Unauthorized(req, res, 'Invalid user');
                        }
                    });
                }
            } catch (err) {
                rHandlers.InternalServerError(req, res, err);
            }
        } else {
            rHandlers.Unauthorized(req, res, 'You must be logged to access this route');
        }
    }
};