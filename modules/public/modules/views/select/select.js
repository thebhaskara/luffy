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
    var BlankHeightMenuItem = pakka({
        name: 'blank-menu-item',
        html: '<li bind-element="el"></li>',
        css: '.blank-menu-item {margin:0;padding:0;border:none;display: block}',
        controller: function(context) {
            var el = context.$get('el');
            context.setHeight = function(height) {
                el.style.height = height + 'px';
            };
        }
    });
    var getHeight = function(component) {
        var height = 0;
        if (component && component.$elements && component.$elements.length > 0) {
            pakka.each(component.$elements, function(el) {
                height += el.clientHeight;
            });
        }
        return height;
    }

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
            offset = 0;
            heights = [];
            renderItems();
        });

        var menuItemsList;
        context.$watch('maxDisplayItems', function(maxDisplayItems) {
            menuItemsList = [];
            for (var i = 0; i < maxDisplayItems; i++) {
                var menuItem = new MenuItem();
                menuItem.$set('displayClass', { 'hover': true, 'link': true });
                menuItemsList.push(menuItem);
            }
        });

        var offset = 0;
        var firstElement = new BlankHeightMenuItem();
        var lastElement = new BlankHeightMenuItem();
        var heights = [];

        var renderItems = function() {
            var items = context.$get('items');
            var menuItems = [];
            var fullLength = items.length;
            var maxDisplayItems = context.$get('maxDisplayItems');
            var length = maxDisplayItems < fullLength ? maxDisplayItems : fullLength;
            var offsetLength = offset + length;

            menuItems.push(firstElement);

            for (var i = offset; i < offsetLength; i++) {
                var item = items[i];
                var index = i - offset;
                var menuItem = menuItemsList[index];
                menuItem.$set('text', item);
                menuItems.push(menuItem);
                heights[i] = getHeight(menuItem);
            };

            menuItems.push(lastElement);

            context.$set('menuItems', menuItems);

            readjustHeights();
        };

        context.$watch('openCloseClass', function(openCloseClass) {
            if (openCloseClass.open) {
                readjustHeights();
            }
        });

        var readjustHeights = function() {

            if (!context.$get('openCloseClass.open')) return;

            var items = context.$get('items');
            var menuItems = context.$get('menuItems');
            var fullLength = items.length;
            var length = context.$get('maxDisplayItems') || fullLength;
            var offsetLength = offset + length;

            for (var i = offset; i < offsetLength; i++) {
                var menuItem = menuItems[(i - offset + 1)];
                heights[i] = getHeight(menuItem);
            };

            if (heights.length < fullLength) {
                var totalHeight = 0;
                pakka.each(heights, function(height) {
                    totalHeight += height;
                });
                var avgHeight = totalHeight / heights.length;
                for (i = heights.length; i < fullLength; i++) {
                    heights[i] = avgHeight;
                }
                context.$set('maxMenuHeight', avgHeight * length);
            }

            var firstElementHeight = 0;
            for (i = 0; i < offset; i++) {
                firstElementHeight += heights[i];
            }
            firstElement.setHeight(firstElementHeight);

            var lastElementHeight = 0;
            for (i = offsetLength + 1; i < heights.length; i++) {
                lastElementHeight += heights[i];
            }
            lastElement.setHeight(lastElementHeight);

        }

        var offsetScroll = 0;
        context.scroll = function(event) {
            console.log(event.wheelDelta);
            offsetScroll += (-event.wheelDelta);
            if (offsetScroll < 0) offsetScroll = 0;
            var sum = 0;
            for (var i = 0; i < heights.length && sum < offsetScroll; i++) {
                sum += heights[i];
            };
            offset = i - 1;
            renderItems();
        };

        var menuElement = context.$get('menuElement');

        context.$watch('maxMenuHeight', function(height) {
            menuElement.style.maxHeight = height + 'px';
        });


        // context.$watch('openCloseClass', function(openCloseClass) {
        //     if (openCloseClass.open) {
        //         context.$getSet('menuItems', function(menuItems) {
        //             var maxDisplayItems = context.$get('maxDisplayItems') || 5;
        //             var menuItem = new MenuItem();
        //             menuItem.$set('text', 'a');
        //             menuItem.$set('displayClass', { 'hover': true, 'link': true });
        //             context.$set('menuItems', [menuItem]);

        //             var height = menuItem.$elements[0].clientHeight;
        //             var displayHeight = height * maxDisplayItems;
        //             menuElement.style.maxHeight = displayHeight + 'px';
        //             return menuItems;
        //         });
        //     }
        // });
    }

    return pakka({
        name: 'select',
        html: Markup,
        css: StyleSheet,
        controller: controller
    })
})
