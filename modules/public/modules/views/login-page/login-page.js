define([
    'app',
    'pakka',
    'text!modules/views/login-page/login-page.html',
    'text!modules/views/login-page/login-page.css',
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
                context.$set('message', 'logging in...');
                ajax.login({
                    username: context.$get('data.username'),
                    password: context.$get('data.password'),
                    success: function(res) {
                        if (res) {
                            context.$set('message', 'logged in');
                            router.redirect('home');
                        } else {
                            context.$set('message', 'invalid credentials');
                        }
                    }
                })
            };
            context.signup = function(event){
                event.preventDefault();
                router.redirect('signup');
            }
        }
    })
})
