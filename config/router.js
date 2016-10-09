var doRoute = function (app, config) {
	var service = require('./../api/controllers/service');
	var securityCtrl = require('./../api/controllers/security')(config);
	var registerCtrl = require('./../api/controllers/register')(config);
	var loginCtrl = require('./../api/controllers/login')(config);

	app.get('/', function (req, res) {
		res.send('Hello World');
	});

	app.all('/service/*', securityCtrl.ensureAuthenticated);

	app.get('/service/test', service.exec);

	app.post('/register', registerCtrl.doPost);

	app.post('/login', loginCtrl.authenticate);
}

exports.doRoute = doRoute;
