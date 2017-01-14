define(['page'], function(page) {

    var router = {},
        authCallbacks = {};

    router.initialize = function() {
        page({
            hashbang: true,
        });
    };

    router.addRoute = function(route, callback) {
        page(route, callback);
    };

    router.registerCallbacks = function(callbacks) {
        authCallbacks = callbacks;
    };

    router.addAuthenticatedRoute = function(route, callback) {
        page(route, function() {
            var args = arguments;
            if (authCallbacks.check) {
                authCallbacks.check(function() {
                    callback.apply({}, args);
                }, authCallbacks.failed || function() {});
            }
        });
    };

    router.redirect = function(path) {
        page.redirect(path);
    };

    return router;
})
