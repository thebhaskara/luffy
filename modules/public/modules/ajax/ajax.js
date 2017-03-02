define([
    'app',
    'reqwest',
    'lodash',
], function(app, reqwest, _) {

    var ajax = function(options) {
        options.data = JSON.stringify(options.data);
        options.contentType = "application/json";
        options.type = 'json';
        return reqwest(options);
    };

    return {
        login: function(options) {

            var data = {
                username: options.username,
                password: options.password
            }

            options = _.pick(options, ['success', 'error', 'complete']);

            options.url = '/api/login';
            options.method = 'post';
            options.data = data;

            return ajax(options);
        },
        checkLogin: function(options) {

            options = _.pick(options, ['success', 'error', 'complete']);

            options.url = '/api/login';
            options.method = 'get';

            return ajax(options);
        },
        signup: function(options) {

            options = _.pick(options, ['data', 'success', 'error', 'complete']);

            options.url = '/api/signup';
            options.method = 'post';

            return ajax(options);
        },
        getAllNotes: function(options) {

            options = _.pick(options, ['data', 'success', 'error', 'complete']);

            options.url = '/api/note';
            // options.method = options.data.id ? 'put' : 'post';

            return ajax(options);
        },
        saveNote: function(options) {

            options = _.pick(options, ['data', 'success', 'error', 'complete']);

            options.url = '/api/note';
            options.method = options.data.id ? 'put' : 'post';

            return ajax(options);
        }
    };
})
