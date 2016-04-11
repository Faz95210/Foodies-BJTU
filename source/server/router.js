
// Dependencies

var express         = require('express');
var eRouter         = express.Router();

var log             = require('./log');
var rHandlers       = require('./rest-handlers');

// Controllers
var homeController      = require('./controllers/home');
var sessionController   = require('./controllers/session');
var userController      = require('./controllers/user');

var initRoutes = function () {
    // Welcome Route
    eRouter.get('/', homeController.index);

    // SessionController Routes
    eRouter.route('/session').post(sessionController.auth);
    eRouter.route('/session').delete(sessionController.destroy);

    // UserController Routes
    eRouter.route('/users').post(userController.create); // Not restricted, registration.
    eRouter.route('/restricted/users').get(userController.index);  // admin or current user.
    eRouter.route('/restricted/users/:uid').get(userController.get); // admin
    eRouter.route('/restricted/users/:uid').put(userController.update);  // admin or current user.
    eRouter.route('/restricted/users/:uid').delete(userController.delete);  // admin
};

module.exports = {
    init : function (app) {
        log('Router', 'Initializing the router');

        // Enable CORS.
        app.all('/*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
            // If preflight request, just stop the execution of the router now.
            if (req.method == 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });

        // Middleware to log requests.
        eRouter.use(function (req, res, next) {
            log('Router', '{ ' + req.method + ' on ' + req.url + ' }');
            next();
        });

        // init routes
        initRoutes();

        // Every restricted routes have to pass the validation.
        app.all('/api/restricted/*', [require('./restricted-routes')]);
        // Every routes will be prefixed by /api.
        app.use('/api', eRouter);

        // Handle 404 NotFound error.
        eRouter.use(function (req, res, next) {
            rHandlers.NotFound(req, res, 'Request ' + req.method + ' ' + req.url + ' not found');
        });
    },
};