var http = require('http');
var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');

var UserSchema = require('./config/UserSchema');
var service = require('./api/controllers/service');
var registerCtrl = require('./api/controllers/register');

var app = express();

app.use(bodyParser.json());

var iniciar = function () {
	app.get('/', function (req, res) {
   		res.send('Hello World');
	});

	app.get('/service', function(req, res) {
		service.exec(req, res);
	});

	app.post('/register', function(req, res) {
		registerCtrl.doPost(req, res, UserSchema);
	});

  	http.createServer(app).listen(8888);
  	console.log("Server started.");
}

iniciar();
