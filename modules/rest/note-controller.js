var noteService = require('../service/noteService');
var auth = require('./auth');
var _ = require('lodash');

module.exports = function(app, getApiUrl) {

    app.get(getApiUrl('/note'), auth(), function(req, res, next) {
        noteService.getAll().then(function(notes) {
            res.send(notes)
        });
    });

    app.post(getApiUrl('/note'), auth(), function(req, res) {
        noteService.create({
            text: req.body.text,
            user: req.session.user
        }).then(function(note) {
            res.send(note);
        }).catch(function(err) {
            console.log(err);
            res.status(500);
            res.send(err);
        })
    });

    app.put(getApiUrl('/note'), auth(), function(req, res) {
        noteService.update({
            id: req.body.id,
            text: req.body.text,
        }).then(function(notes) {
            res.send(req.body);
        }).catch(function(err) {
            console.log(err);
            res.status(500);
            res.send(err);
        });
    });
}
