define([
    'app',
    'pakka',
    'text!modules/views/note/note.html',
    'text!modules/views/note/note.css',
    'modules/ajax/ajax',
], function(app, pakka, Markup, StyleSheet, ajax) {
    return pakka({
        name: 'note',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {

            function saveNote() {
                ajax.saveNote({
                    data: {
                        id: context.$get('id'),
                        text: context.$get('text'),
                    }
                }).then(function(note) {
                    context.$set('id', note.id);
                    context.$set('text', note.text);
                    context.$set('enterPressed');
                })
            }

            var isDirty = false,
                text;

            context.checkEnter = function(event) {
                var code = (event.keyCode ? event.keyCode : event.which);
                if (code == 13) { //Enter keycode
                    event.preventDefault();
                    saveNote();
                    return false;
                }
                if (text != context.$get('text')) {
                    isDirty = true;
                }
            }

            context.blur = function() {
                if (isDirty) {
                    saveNote();
                }
                isDirty = false;
                text = context.$get('text');
            }

            context.focus = function() {
                text = context.$get('text');
                var el = context.$get('inputElement'),
                    text = context.$get('text') || "",
                    textLength = text.length;
                if (textLength > 0) {
                    var range = document.createRange(),
                        sel = window.getSelection();
                    range.setStart(el.childNodes[0], textLength);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                el.focus();
                isDirty = false;
            }
        }
    })
})
