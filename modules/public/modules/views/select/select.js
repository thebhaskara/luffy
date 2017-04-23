define([
    'app',
    'pakka',
    'text!modules/views/select/select.html',
    'text!modules/views/select/select.css',
    'modules/ajax/ajax',
], function(app, pakka, Markup, StyleSheet, ajax) {

    var MenuItem = pakka({
        name: 'menu-item',
        html: '<li bind-class="displayClass" bind-text="text"></li>'
    });

    var controller = function(context) {
        context.toggleFlyout = function(event) {
            event.preventDefault();
            context.$getSet('openCloseClass', function(openCloseClass) {
                if (!openCloseClass) openCloseClass = {};
                openCloseClass['open'] = !openCloseClass['open'];
                return openCloseClass;
            });
        }

        context.$watch('items', function(items) {
            var menuItems = [];
            pakka.each(items, function(item) {
                var menuItem = new MenuItem();
                menuItem.$set('text', item);
                menuItem.$set('displayClass', { 'hover': true, 'link': true });
                menuItems.push(menuItem);
            });
            context.$set('menuItems', menuItems);
        });

        var menuElement = context.$get('menuElement');
        context.$watch('openCloseClass', function(openCloseClass) {
            if (openCloseClass.open) {
                context.$getSet('menuItems', function(menuItems) {
                    var maxDisplayItems = context.$get('maxDisplayItems') || 5;
                    var menuItem = new MenuItem();
                    menuItem.$set('text', 'a');
                    menuItem.$set('displayClass', { 'hover': true, 'link': true });
                    context.$set('menuItems', [menuItem]);

                    var height = menuItem.$elements[0].clientHeight;
                    var displayHeight = height * maxDisplayItems;
                    menuElement.style.maxHeight = displayHeight + 'px';
                    return menuItems;
                });
            }
        });
    }

    return pakka({
        name: 'select',
        html: Markup,
        css: StyleSheet,
        controller: controller
    })
})
