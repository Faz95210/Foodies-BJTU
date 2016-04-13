
var rHandlers   = require('../rest-handlers');
var log         = require('../log');

var User        = require('../models/user')

module.exports = {
    // GET /users
    index: function (req, res) {
        if (req.session.user.isAdmin) {
            User.find({}, '_id username email role isAdmin', function (err, users) {
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
        if (req.session.user.isAdmin || req.session.user.id === uid) {
            User.findById(uid, '_id username email role isAdmin', function (err, user) {
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
        req.checkBody('username', 'Field username is required').notEmpty();
        req.checkBody('password', 'Field password is required').notEmpty();
        req.checkBody('email', 'Field email is required').notEmpty();
        req.checkBody('email', 'Field email is not an email').optional({
            checkFalsy: true
        }).isEmail();
        req.checkBody('role', 'Field role is required').notEmpty();
        req.checkBody('role', 'Field role must be a customer or an owner').optional({
            checkFalsy: true
        }).matches(/^((owner)|(customer))$/);

        // Tss, return false instead of an empty array if no errors.
        var errors = req.validationErrors();
        if (errors) {
            rHandlers.BadRequest(req, res, errors);
        } else {
            errors = [];
            // Check if username or email already used.
            User.count({username: req.body.username}, function (err, count) {
                if (count) errors.push(getError('username', 'This username is already existing', req.body.username));
                User.count({email: req.body.email}, function (err, count) {
                    if (count) errors.push(getError('email', 'This email is already existing', req.body.email));
                    if (errors.length > 0) {
                        rHandlers.BadRequest(req, res, errors);
                    } else {
                        // Creation of the user.
                        User({
                            username: req.body.username,
                            password: req.body.password,
                            email   : req.body.email,
                            role    : req.body.role,
                            isAdmin : false
                        }).save(function (err, user) {
                            if (!err && user) {
                                // Don't want to return these fields.
                                user.password = undefined;
                                user.__v = undefined;

                                rHandlers.Created(req, res, user);
                            } else {
                                rHandlers.UnprocessableEntity(req, res, 'An error happenned while creating the new user');
                            }
                        });
                    }
                });
            });
        }
    },
    // PUT /users/:uid
    // -- In every case, I want to receive the email AND the password, even if one of them is not updated.
    update: function (req, res) {
        if (req.session.user.isAdmin || req.session.user.id === req.params.uid) {
            req.checkBody('password', 'Field password is required').notEmpty();
            req.checkBody('email', 'Field email is required').notEmpty();
            req.checkBody('email', 'Field email is not an email').optional({
                checkFalsy: true
            }).isEmail();

            // Tss, return false instead of an empty array if no errors.
            var errors = req.validationErrors();
            if (errors) {
                rHandlers.BadRequest(req, res, errors);
            } else {
                User.findById(req.params.uid, function (err, user) {
                    User.count({email: req.body.email}, function (err, count) {
                        if (user.email !== req.body.email && count) {
                            rHandlers.BadRequest(req, res, [getError('email', 'This email is already existing', req.body.email)])
                        } else {
                            user.email = req.body.email;
                            user.password = req.body.password;
                            user.save(function (err) {
                                if (err) {
                                    rHandlers.UnprocessableEntity(req, res, 'An error happenned while updating the user');
                                } else {
                                    // Don't want to return these fields.
                                    user.password = undefined;
                                    user.__v = undefined;
                                    rHandlers.Ok(req, res, user);
                                }
                            });
                        }
                    });
                });
            }
        } else {
            rHandlers.Unauthorized(req, res, 'You are not authorized to access this resource');
        }

    },
    // DELETE /users/:uid
    delete: function (req, res) {
        if (req.session.user.isAdmin) {
            if (req.params.uid === req.session.user.id) {
                rHandlers.BadRequest(req, res, 'You can\'t delete your own account');
            } else {
                User.remove({_id: req.params.uid}, function (err) {
                    if (err) {
                        rHandlers.NotFound('User with id `' + req.params.uid + '` not found');
                    } else {
                        rHandlers.NoContent(req, res);
                    }
                });
            }
        }
    }
};

var getError = function (param, msg, value) {
    return { param: param, msg: msg, value: value};
}