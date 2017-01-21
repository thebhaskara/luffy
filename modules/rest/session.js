var uuid = require('uuid/v4');
var sessionHeaderName = 'luffy-session';
var sessions = {};

module.exports = function() {
    return function(req, res, next) {
        var sessionId = req.cookies['JSESSIONID'],
            session;

        if (!sessionId) {
            sessionId = uuid();
        }

        // making response cookie with JSESSIONID
        // not sure whether to keep this line
        // because node server already creates the JSESSIONID
        res.cookie('JSESSIONID', sessionId);

        res.session = req.session = sessions[sessionId] = sessions[sessionId] || {};
        
        next();
    };
};
