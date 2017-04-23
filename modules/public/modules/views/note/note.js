define([
    'app',
    'pakka',
    'text!modules/views/note/note.html',
    'text!modules/views/note/note.css',
    'modules/ajax/ajax',
    'modules/views/select/select',
], function(app, pakka, Markup, StyleSheet, ajax, Select) {
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

            function deleteNote() {
                var id = context.$get('id');

                if(!id) return;

                ajax.deleteNote({
                    data: {
                        id: id
                    }
                }).then(function(note) {
                    context.$destroy();
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

            context.deleteNote = function(event){
                event.preventDefault();
                deleteNote();
            }

            var selectTag = new Select();
            context.$set('selectTag', selectTag);
            selectTag.$set('items', [
                'asdf', 
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
                'asdf sdf asdf',
            ]);
        }
    })
})
