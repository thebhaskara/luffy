require.config({
    paths: {
        'text': 'node_modules/requirejs-text/text',
        'page': 'node_modules/page/page',
        'pakka': 'node_modules/pakkajs/pakka',
        'lodash': 'node_modules/lodash/lodash',
        'reqwest': 'node_modules/reqwest/reqwest',
    },

    shim: {
        'modules/router/register-routes': {
            deps: ['app', 'modules/base-page/base-page']
        }
    },

    map: {}
});

define('app', [], function() {
    return {};
});

requirejs([
    'app',
    'modules/base-page/base-page',
    'modules/router/register-routes',
]);
