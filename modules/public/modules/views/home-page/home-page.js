define([
    'app',
    'pakka',
    'text!modules/views/home-page/home-page.html',
    'text!modules/views/home-page/home-page.css',
    'modules/ajax/ajax',
    'modules/views/note/note',
    'lodash',
], function(app, pakka, Markup, StyleSheet, ajax, Note, lodash) {
    return pakka({
        name: 'home-page',
        html: Markup,
        css: StyleSheet,
        controller: function(context) {
            context.addNote = function(noteObj, isFocusNotNeeded) {
                var noteComponents = context.$get('noteComponents') || [];
                var note = new Note();

                note.$watch('enterPressed', function() {
                    var noteComponents = context.$get('noteComponents') || [];
                    if (noteComponents.length > 0 &&
                        noteComponents[0].$get('id')) {
                        context.addNote();
                    }
                })

                if (noteObj && noteObj.id) {
                    note.$set('id', noteObj.id);
                    note.$set('text', noteObj.text);
                }

                noteComponents.unshift(note);
                context.$set('noteComponents', noteComponents);

                if (isFocusNotNeeded != true) note.focus();
            }

            ajax.getAllNotes().then(function(notes) {
                lodash.each(notes, function(note) {
                    context.addNote(note, true);
                });
                context.addNote();
            });
        }
    })
})
