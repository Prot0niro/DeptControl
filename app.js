var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./config/UserSchema');
var service = require('./api/controllers/service');
var registerCtrl = require('./api/controllers/register');
var loginCtrl = require('./api/controllers/login');

var app = express();
var UserModel = User.getModel(mongoose);

app.use(bodyParser.json());

var iniciar = function () {
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

  	http.createServer(app).listen(8888);
  	console.log("Server started.");
}

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', iniciar);
