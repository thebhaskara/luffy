define([
    'app',
    'pakka',
    'text!modules/base-page/base-page.html',
    'text!modules/base-page/base-page.css',
    'text!modules/base-page/flex-box.css',
], function(app, pakka, Markup, StyleSheet, FlexBoxCss) {

    app.base = pakka.create({
        name: 'page',
        html: Markup,
        css: StyleSheet + FlexBoxCss,
    });

    var body = document.body;

    pakka.each(app.base.$elements, function(element) {
        body.appendChild(element);
    })

    return app;
})
