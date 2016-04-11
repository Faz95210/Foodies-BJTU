
// Look repetitive, but it's only in order to stay RestFUL.

// These functions follow the RestFUL convention.
module.exports = {
    Ok : function (req, res, output) {
        res.status(200);
        res.json(output)
    },
    Created : function (req, res, output) {
        res.status(201);
        res.json(output);
    },
    NoContent : function (req, res) {
        res.status(204).send();
    },
    BadRequest : function (req, res, output) {
        res.status(400);
        res.json({
            code: 400,
            text: 'BadRequest',
            message: output
        });
    },
    NotFound : function (req, res, output) {
        res.status(404);
        res.json({
            code: 404,
            text: 'NotFound',
            message: output
        });
    },
    Unauthorized : function (req, res, output) {
        res.status(401);
        res.json({
            code: 401,
            text: 'Unauthorized',
            message: output
        });
    },
    UnprocessableEntity : function (req, res, output) {
        res.status(422);
        res.json({
            code: 422,
            text: 'UnprocessableEntity',
            message: output
        });
    },
    InternalServerError : function (req, res, output) {
        res.status(500);
        res.json({
            code: 500,
            text: 'InternalServerError',
            message: output
        });
    }
};