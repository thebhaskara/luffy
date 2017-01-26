define([
    'app',
    'pakka',
    'text!modules/base-page/base-page.html',
    'text!modules/base-page/base-page.css',
    'text!node_modules/normalize.css/normalize.css',
    'text!node_modules/roboto-fontface/css/roboto/roboto-fontface.css',
    'text!node_modules/material-design-icons/iconfont/material-icons.css',
    'text!modules/base-page/flex-box.css',
    'text!modules/base-page/button.css',
    'text!modules/base-page/input.css',
], function(app, pakka, Markup, StyleSheet,
    NormalizeCss, RobotoFontfaceCss, MaterialIcons, 
    FlexBoxCss, ButtonCss, InputCss) {

    app.base = pakka.create({
        name: 'page',
        html: Markup,
        css: NormalizeCss + RobotoFontfaceCss + MaterialIcons +
            FlexBoxCss + ButtonCss + InputCss + StyleSheet,
    });

    var body = document.body;

    pakka.each(app.base.$elements, function(element) {
        body.appendChild(element);
    })

    return app;
})
