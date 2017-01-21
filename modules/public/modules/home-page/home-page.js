define([
    'app',
    'pakka',
    'text!modules/home-page/home-page.html',
    'text!modules/home-page/home-page.css',
    'modules/ajax/ajax',
    'modules/router/router-implementation',
], function(app, pakka, Markup, StyleSheet, ajax, router) {
    return pakka({
        name: 'home-page',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {}
    })
})
