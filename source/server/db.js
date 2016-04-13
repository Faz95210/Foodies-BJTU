
var mongoose = require('mongoose'); // ORM
var log      = require('./log');

var dbUri   = 'mongodb://localhost/foodieDB';

module.exports = {
    connect: function () {
        // Connect to the database.
        mongoose.connect(dbUri);

        mongoose.connection.on('connected', function () {
            log('DB', 'Successfully connected to \'' + dbUri + '\'');
        });

        mongoose.connection.on('error', function (err) {
            log('DB', 'An error happenned while connecting to the database: ' + err);
            process.exit(1);
        });

        mongoose.connection.on('disconnected', function () {
            log('DB', 'Successfully disconnected from \'' + dbUri + '\'');
        });

        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                log('DB', 'Mongoose connection closed through app termination');
                process.exit(0);
            });
        });
    }
};