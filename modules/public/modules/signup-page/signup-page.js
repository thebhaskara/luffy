define([
    'app',
    'pakka',
    'text!modules/signup-page/signup-page.html',
    'text!modules/signup-page/signup-page.css',
    'modules/ajax/ajax',
    'modules/router/router-implementation',
], function(app, pakka, Markup, StyleSheet, ajax, router) {
    return pakka({
        name: 'login-page',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {
            context.$set('data', {});
            context.login = function(e) {
                e.preventDefault();
                router.redirect('login');
            }
            context.signup = function(e) {
                e.preventDefault();
                if (context.$get('data.password') != context.$get('confirmPassword')) {
                    context.$set('message', 'confirm password is not matching!');
                    return;
                }
                context.$set('message', 'signing up...');
                ajax.signup({
                    data: context.$get('data'),
                    success: function(res) {
                        if (res && res.username) {
                            context.$set('message', res.username + ' is now signed up!');
                        } else {
                            context.$set('message', 'well this is awkward!');
                        }
                    },
                    error: function(res) {
                        context.$set('message', res);
                    }
                })
            }
        }
    })
})
