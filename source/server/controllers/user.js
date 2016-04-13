
var rHandlers   = require('../rest-handlers');
var log         = require('../log');

var User        = require('../models/user')

module.exports = {
    // GET /users
    index: function (req, res) {
        if (req.session.user.role === 'admin') {
            User.find({}, '_id username email', function (err, users) {
                if (err || users.length === 0) {
                    rHandlers.Ok(req, res, []);
                } else {
                    rHandlers.Ok(req, res, users);
                }
            });
        } else {
            rHandlers.Unauthorized(req, res, 'You are not authorized to access this resource');
        }
    },
    // GET /users/:uid
    get: function (req, res) {
        var uid = req.params.uid;
        if (req.session.user.role === 'admin' || req.session.user.id === uid) {
            User.findById(uid, '_id username email', function (err, user) {
                if (!err && user) {
                    rHandlers.Ok(req, res, user);
                } else {
                    rHandlers.NotFound(req, res, 'User with id `' + uid + '` not found');
                }
            });
        } else {
            rHandlers.Unauthorized(req, res, 'You are not authorized to access this resource');
        }
    },
    // POST /users/
    create: function (req, res) {
    },
    // PUT /users/:uid
    update: function (req, res) {
    },
    // DELETE /users/:uid
    delete: function (req, res) {
    }
};