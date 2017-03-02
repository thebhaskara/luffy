var _ = require('lodash');
var db = require('./db');

var repos = {
	user: require('./userRepo'),
	password: require('./passwordRepo'),
	note: require('./noteRepo'),
	tag: require('./tagRepo'),
}

repos.init = function(){
	return db.init();
}

module.exports = repos;