define([
    'app',
    'modules/router/router-implementation',
    'modules/ajax/ajax',
], function(app, router, ajax) {

    var showPage = function(settings) {
        require([settings.pageUrl], function(PageView) {
            app.base.$set('page', new PageView());
        })
    };

    var check = function() {
        return ajax.checkLogin();
    };

    var failed = function() {
        router.redirect('login');
    };

    router.registerCallbacks({
        check: check,
        failed: failed,
    });

    router.addRoute('login', function() {
        showPage({
            pageUrl: 'modules/login-page/login-page'
        });
    });

    router.addRoute('signup', function() {
        showPage({
            pageUrl: 'modules/signup-page/signup-page'
        });
    });

    router.addAuthenticatedRoute('home', function() {
        showPage({
            pageUrl: 'modules/home-page/home-page'
        });
    });

    // please add this common route as last one
    // otherwise this is ending up in an infinite loop
    router.addRoute('*', function() {
        router.redirect('login');
    });

    router.initialize();

    return router;
});
