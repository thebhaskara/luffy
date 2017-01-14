define([
    'app',
    'modules/router/router-implementation'
], function(app, router) {

    var showPage = function(settings) {
        require([settings.pageUrl], function(PageView) {
            app.base.$set('page', new PageView());
        })
    };

    router.addRoute('login', function() {
        showPage({
            pageUrl: 'modules/login-page/login-page'
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
