var service = require('./../api/controllers/service');
var registerCtrl = require('./../api/controllers/register');
var loginCtrl = require('./../api/controllers/login');
var securityCtrl = require('./../api/controllers/security');

var doRoute = function (app, config) {
	app.get('/', function (req, res) {
		res.send('Hello World');
	});

	app.all('/service/*', function(req, res, next) {
		securityCtrl.ensureAuthenticated(config, req, res, next);
	});

	app.get('/service/test', function(req, res) {
		service.exec(req, res);
	});

	app.post('/register', function(req, res) {
		return registerCtrl.doPost(req, res, config);
	});

	app.post('/login', function (req, res) {
		return loginCtrl.authenticate(req, res, config);
	});
}

exports.doRoute = doRoute;
