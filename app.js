var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = require('./config/router');

var app = express();

app.use(bodyParser.json());

var init = function () {
	router.doRoute(app, mongoose);

  	http.createServer(app).listen(8888);
  	console.log("Server started.");
}

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', init);
