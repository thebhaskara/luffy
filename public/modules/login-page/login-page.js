define([
    'app',
    'pakka',
    'text!modules/login-page/login-page.html',
    'text!modules/login-page/login-page.css',
], function(app, pakka, Markup, StyleSheet) {
    return pakka({
    	name: 'login-page',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {
        	context.$set('data', {});
        }
    })
})
