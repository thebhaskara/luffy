define([
    'app',
    'pakka',
    'text!modules/views/header/header.html',
    'text!modules/views/header/header.css',
], function(app, pakka, Markup, StyleSheet, ajax, router) {
    return pakka({
        name: 'header',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {}
    })
})
