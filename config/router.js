var service = require('./../api/controllers/service');
var registerCtrl = require('./../api/controllers/register');
var loginCtrl = require('./../api/controllers/login');

var User = require('./UserSchema');

var doRoute = function (app, mongoose) {
	var UserModel = User.getModel(mongoose);

	app.get('/', function (req, res) {
		res.send('Hello World');
	});

	app.get('/service', function(req, res) {
		service.exec(req, res);
	});

	app.post('/login', function(req, res) {
		return loginCtrl.doPost(req, res, UserModel);
	});

	app.post('/register', function(req, res) {
		return registerCtrl.doPost(req, res, UserModel);
	});
}

exports.doRoute = doRoute;
