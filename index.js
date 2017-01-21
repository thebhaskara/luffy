var db = require('./modules/database/index');
var service = require('./modules/service/index');
var rest = require('./modules/rest/index');

db.init().then(function() {
	// creating user
    // service.user.create({
    //     firstName: 'Luffy',
    //     lastName: 'Monkey D.',
    //     password: 'luffy',
    //     username: 'luffy'
    // });
});

rest();
