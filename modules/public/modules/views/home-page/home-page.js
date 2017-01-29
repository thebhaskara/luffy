define([
    'app',
    'pakka',
    'text!modules/views/home-page/home-page.html',
    'text!modules/views/home-page/home-page.css',
    'modules/ajax/ajax',
    'modules/router/router-implementation',
], function(app, pakka, Markup, StyleSheet, ajax, router) {
    return pakka({
        name: 'home-page',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {
            context.signup = function() {
                console.log(context.$get('data'));
            }
        }
    })
})
