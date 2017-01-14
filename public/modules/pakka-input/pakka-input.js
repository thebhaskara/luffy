define([
    'app',
    'pakka',
    'text!modules/pakka-input/pakka-input.html',
    'text!modules/pakka-input/pakka-input.css',
], function(app, pakka, Markup, StyleSheet) {
    return pakka({
    	name: 'pakka-input',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {
        	context.$set('data', {});
        }
    })
})
