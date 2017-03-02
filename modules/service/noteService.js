var _ = require('lodash');
var repos = require('../database/index')

module.exports = {
    getAll: function() {
        return new Promise(function(resolve, reject) {
            repos.note.findAll().then(resolve).catch(reject);
        }).then(function(notes) {
            return _.map(notes, function(note) {
                return note.toJSON();
            });
        });
    },
    get: function(id) {

    },
    create: function(note) {
        return repos.note.create(note);
    },
    update: function(note) {
        return repos.note.update(note);
    },
}
