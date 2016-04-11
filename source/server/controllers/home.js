

var rHandlers   = require('../rest-handlers.js');

module.exports = {
    // GET /
    index: function (req, res) {
        rHandlers.Ok(req, res, {
            code: 200,
            text: 'Ok',
            message: 'Welcome to Foodie Restful API'
        });
    }
};