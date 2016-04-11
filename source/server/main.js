
// Dependencies
var express     = require('express');       // Framework
var app         = express();                // Define the app using express.
var mongoose    = require('mongoose');      // ORM
var bodyParser  = require('body-parser');   // To parse body of post requests

var log         = require('./log');
var router      = require('./router');
var db          = require('./db');

log('Main', 'Starting Restful Api');

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());
app.locals.port = process.env.port || 8080;
// Setup the router.
router.init(app);

// Connect to the database.
db.connect();
// Setup user model.
var User = require('./models/user.js');

app.listen(app.locals.port);
log('Main', 'Server listening on port \'' + app.locals.port + '\'');
