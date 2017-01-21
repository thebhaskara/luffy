var _ = require('lodash');

var repos = {
	user: require('./userRepo'),
}

repos.init = function(){
	var promises = [];
	_.each(repos, function(repo){
		if(repo.sync){
			promises.push(repo.sync());
		}
	});

	return Promise.all(promises);
}

module.exports = repos;