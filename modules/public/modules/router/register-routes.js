define([
    'app',
    'modules/router/router-implementation',
    'modules/ajax/ajax',
], function(app, router, ajax) {

    var showPage = function(settings) {
        if (settings.header) {
            showHeader(settings.header);
        } else {
            removeHeader();
        }
        require([settings.pageUrl], function(PageView) {
            app.base.$set('page', new PageView());
        })
    };

    var header,
        showHeader = function(settings) {
            if (header) {
                app.base.$set('header', header);
                header.$set('settings', settings);
            } else {
                require(['modules/views/header/header'], function(Header) {
                    header = new Header();
                    showHeader(settings);
                });
            }
        },
        removeHeader = function() {
            app.base.$set('header', false);
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
            pageUrl: 'modules/views/login-page/login-page'
        });
    });

    router.addRoute('signup', function() {
        showPage({
            pageUrl: 'modules/views/signup-page/signup-page'
        });
    });

    router.addAuthenticatedRoute('home', function() {
        showPage({
            pageUrl: 'modules/views/home-page/home-page',
            header: true
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
