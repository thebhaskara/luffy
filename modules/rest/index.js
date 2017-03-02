var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('./session');
var auth = require('./auth');
var baseApiUrl = '/api';

var getApiUrl = function(url) {
    return baseApiUrl + url;
};

module.exports = function() {

    app.use(cookieParser());
    app.use(session());

    app.use(express.static('modules/public'));
    app.use(express.static('node_modules/material-design-icons/iconfont'));
    app.use('/node_modules', express.static('node_modules'));
    app.use('/fonts', express.static('node_modules/roboto-fontface/fonts'));
    app.use('/fonts', express.static('node_modules/roboto-fontface/fonts'));


    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    require('./login-controller')(app, getApiUrl);
    require('./signup-controller')(app, getApiUrl);
    require('./note-controller')(app, getApiUrl);

    app.listen(3000, function() {
        console.log('Example app listening on port 3000!')
    });
};
